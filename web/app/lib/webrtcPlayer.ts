export interface WebRTCPlayerOptions {
    remoteVideoEl: HTMLVideoElement;
    audio?: boolean | MediaTrackConstraints;
    video?: boolean | MediaTrackConstraints;
    offerUrl?: string;
    onDataChannelMessage?: (message: any) => void;
}

export class WebRTCPlayer {
    private pc: RTCPeerConnection | null = null;
    private dc: RTCDataChannel | null = null;
    public localStream: MediaStream | null = null;
    public remoteStream: MediaStream | null = null;
    private options: WebRTCPlayerOptions;
    public sessionId: string | null = null;
    private connectionTimeout: NodeJS.Timeout | null = null;
    private iceGatheringCompleter: (() => void) | null = null;

    constructor(options: WebRTCPlayerOptions) {
        this.options = options;
    }

    public async start() {
        console.log("[WebRTCPlayer] start() called");
        try {
            await this.createPeerConnection();
            await this.getUserMediaAndAddTracks();
            await this.negotiate();

            // 设置连接超时
            this.connectionTimeout = setTimeout(() => {
                if (this.pc && this.pc.connectionState !== 'connected') {
                    console.error("[WebRTCPlayer] 连接超时");
                    this.close();
                }
            }, 30000); // 30秒超时

        } catch (error) {
            console.error("[WebRTCPlayer] 启动失败:", error);
            throw error;
        }
    }

    private async createPeerConnection() {
        // 配置ICE服务器以提高连接成功率
        const config = {
            iceServers: [],
            iceTransportPolicy: "all" as RTCIceTransportPolicy,
            bundlePolicy: "max-bundle" as RTCBundlePolicy,
            rtcpMuxPolicy: "require" as RTCRtcpMuxPolicy,
            iceCandidatePoolSize: 10,
        };

        console.log("[WebRTCPlayer] 创建PeerConnection，配置:", config);

        this.pc = new RTCPeerConnection(config);
        console.log("[WebRTCPlayer] PeerConnection created");

        // 创建本地DataChannel
        try {
            this.dc = this.pc.createDataChannel("interview", {
                ordered: true
            });

            this.dc.onopen = () => {
                console.log("[WebRTCPlayer] DataChannel已打开");
            };

            this.dc.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    if (this.options.onDataChannelMessage) {
                        this.options.onDataChannelMessage(message);
                    }
                } catch (error) {
                    if (this.options.onDataChannelMessage) {
                        this.options.onDataChannelMessage({content: event.data});
                    }
                }
            };

            this.dc.onclose = () => {
                console.log("[WebRTCPlayer] DataChannel已关闭");
            };

            this.dc.onerror = (error) => {
                console.error("[WebRTCPlayer] DataChannel错误:", error);
            };
        } catch (error) {
            console.error("[WebRTCPlayer] 创建DataChannel失败:", error);
        }

        // 监听远端DataChannel（作为备用）
        this.pc.addEventListener("datachannel", (event) => {
            // 如果本地DataChannel不存在，使用远端DataChannel
            if (!this.dc) {
                this.dc = event.channel;

                this.dc.onopen = () => {
                    console.log("[WebRTCPlayer] DataChannel已打开");
                };

                this.dc.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        if (this.options.onDataChannelMessage) {
                            this.options.onDataChannelMessage(message);
                        }
                    } catch (error) {
                        if (this.options.onDataChannelMessage) {
                            this.options.onDataChannelMessage({content: event.data});
                        }
                    }
                };

                this.dc.onclose = () => {
                    console.log("[WebRTCPlayer] DataChannel已关闭");
                };

                this.dc.onerror = (error) => {
                    console.error("[WebRTCPlayer] DataChannel错误:", error);
                };
            }
        });

        // 监听远端track
        this.pc.addEventListener("track", (evt) => {
            console.log("[WebRTCPlayer] 收到远端track:", evt.track.kind, evt.track);
            if (!this.remoteStream) {
                this.remoteStream = new MediaStream();
                // 立即设置远端流到video元素
                if (this.options.remoteVideoEl) {
                    this.options.remoteVideoEl.srcObject = this.remoteStream;
                    console.log("[WebRTCPlayer] 远端视频流已设置到video元素");
                }
            }
            this.remoteStream.addTrack(evt.track);
            console.log("[WebRTCPlayer] 远端track已添加到remoteStream，当前track数量:", this.remoteStream.getTracks().length);
        });

        // 基本状态监听
        this.pc.addEventListener("connectionstatechange", () => {
            console.log("[WebRTCPlayer] 连接状态变化:", this.pc?.connectionState);
            if (this.pc?.connectionState === 'connected') {
                if (this.connectionTimeout) {
                    clearTimeout(this.connectionTimeout);
                    this.connectionTimeout = null;
                }
                console.log("[WebRTCPlayer] WebRTC连接已建立！");
                
                // 检查是否有远端流
                if (this.remoteStream) {
                    console.log("[WebRTCPlayer] 远端流状态:", {
                        trackCount: this.remoteStream.getTracks().length,
                        videoTracks: this.remoteStream.getVideoTracks().length,
                        audioTracks: this.remoteStream.getAudioTracks().length
                    });
                } else {
                    console.log("[WebRTCPlayer] 还没有收到远端流");
                }
            } else if (this.pc?.connectionState === 'failed') {
                console.error("[WebRTCPlayer] WebRTC连接失败！");
                // 获取详细的连接统计信息
                this.pc.getStats().then(stats => {
                    stats.forEach(report => {
                        if (report.type === 'candidate-pair') {
                            console.log("[WebRTCPlayer] 候选者对:", {
                                state: report.state,
                                localCandidateId: report.localCandidateId,
                                remoteCandidateId: report.remoteCandidateId,
                                priority: report.priority,
                                nominated: report.nominated,
                                writable: report.writable,
                                readable: report.readable
                            });
                        }
                    });
                });
            }
        });

        this.pc.addEventListener("iceconnectionstatechange", () => {
            console.log("[WebRTCPlayer] ICE连接状态:", this.pc?.iceConnectionState);
            if (this.pc?.iceConnectionState === 'failed') {
                console.error("[WebRTCPlayer] ICE连接失败！");
                // 获取ICE统计信息
                this.pc.getStats().then(stats => {
                    stats.forEach(report => {
                        if (report.type === 'local-candidate') {
                            console.log("[WebRTCPlayer] 本地候选者:", {
                                candidateType: report.candidateType,
                                protocol: report.protocol,
                                address: report.address,
                                port: report.port,
                                priority: report.priority
                            });
                        }
                        if (report.type === 'remote-candidate') {
                            console.log("[WebRTCPlayer] 远程候选者:", {
                                candidateType: report.candidateType,
                                protocol: report.protocol,
                                address: report.address,
                                port: report.port
                            });
                        }
                    });
                });
            }
        });

        this.pc.addEventListener("signalingstatechange", () => {
            console.log("[WebRTCPlayer] 信令状态:", this.pc?.signalingState);
        });

        // ICE候选者监听
        this.pc.addEventListener("icecandidate", (event) => {
            if (event.candidate) {
                console.log("[WebRTCPlayer] ICE候选者:", {
                    candidate: event.candidate.candidate,
                    sdpMid: event.candidate.sdpMid,
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                    type: event.candidate.type,
                    protocol: event.candidate.protocol,
                    address: event.candidate.address,
                    port: event.candidate.port,
                });
            } else {
                console.log("[WebRTCPlayer] ICE候选者收集完成");
                if (this.iceGatheringCompleter) {
                    this.iceGatheringCompleter();
                    this.iceGatheringCompleter = null;
                }
            }
        });

        // 添加ICE候选者错误监听
        this.pc.addEventListener("icecandidateerror", (event) => {
            console.error("[WebRTCPlayer] ICE候选者错误:", {
                errorCode: event.errorCode,
                errorText: event.errorText,
                url: event.url,
            });
        });
    }

    private async getUserMediaAndAddTracks() {
        const constraints: MediaStreamConstraints = {audio: false, video: false};
        if (this.options.audio) constraints.audio = this.options.audio;
        if (this.options.video) constraints.video = this.options.video;

        // 只有当需要音频或视频时才获取媒体流
        if (this.options.audio || this.options.video) {
            try {
                this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log("[WebRTCPlayer] 本地流采集成功", this.localStream);
                
                this.localStream.getTracks().forEach((track) => {
                    this.pc?.addTrack(track, this.localStream!);
                    console.log("[WebRTCPlayer] 添加track到PeerConnection", track);
                });
            } catch (error) {
                console.error("[WebRTCPlayer] 获取媒体流失败:", error);
                throw new Error(`获取媒体流失败: ${error}`);
            }
        } else {
            console.log("[WebRTCPlayer] 不需要音频视频流，跳过媒体采集");
        }
    }

    private async negotiate() {
        if (!this.pc) throw new Error("PeerConnection 未初始化");

        try {
            const iceGatheringComplete = new Promise<void>(resolve => {
                // 如果ICE已经收集完毕，则立即解决
                if (this.pc?.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    this.iceGatheringCompleter = resolve;
                }
            });

            const offer = await this.pc.createOffer();
            console.log("[WebRTCPlayer] 创建offer成功");

            await this.pc.setLocalDescription(offer);
            console.log("[WebRTCPlayer] 设置本地offer成功");

            console.log("[WebRTCPlayer] 等待ICE候选者收集...");
            // 设置一个超时，以防万一ICE收集过程卡住
            await Promise.race([iceGatheringComplete, new Promise(r => setTimeout(r, 2000))]);
            console.log("[WebRTCPlayer] ICE候选者收集完成或超时");

            const offerUrl = this.options.offerUrl || "http://localhost:8080/api/offer";
            const body = {
                sdp: this.pc.localDescription!.sdp,
                type: this.pc.localDescription!.type,
            };

            console.log("[WebRTCPlayer] 发送offer到后端:", offerUrl);
            const response = await fetch(offerUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`后端响应错误: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const answer = await response.json();
            console.log("[WebRTCPlayer] 收到后端answer:", answer);
            
            // 保存session_id
            this.sessionId = answer.session_id || null;
            console.log("[WebRTCPlayer] 保存session_id:", this.sessionId);

            if (!answer.sdp || !answer.type) {
                throw new Error("后端返回的answer格式不正确");
            }

            console.log("[WebRTCPlayer] 设置远端SDP");
            await this.pc.setRemoteDescription(
                new RTCSessionDescription({
                    sdp: answer.sdp,
                    type: answer.type,
                })
            );
            console.log("[WebRTCPlayer] 设置远端SDP成功");

            // 等待ICE连接建立
            console.log("[WebRTCPlayer] 等待ICE连接建立...");
            await this.waitForConnection();
            console.log("[WebRTCPlayer] ICE连接建立完成");

        } catch (error) {
            console.error("[WebRTCPlayer] 协商失败:", error);
            throw error;
        }
    }

    private async waitForConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error("ICE连接建立超时"));
            }, 15000); // 15秒超时

            const checkConnection = () => {
                if (this.pc?.connectionState === 'connected') {
                    clearTimeout(timeout);
                    resolve();
                } else if (this.pc?.connectionState === 'failed') {
                    clearTimeout(timeout);
                    reject(new Error("ICE连接失败"));
                } else {
                    // 继续等待
                    setTimeout(checkConnection, 100);
                }
            };

            checkConnection();
        });
    }

    public sendDataChannelMessage(msg: string): boolean {
        if (this.dc && this.dc.readyState === "open") {
            this.dc.send(msg);
            return true;
        } else {
            console.warn("[WebRTCPlayer] DataChannel未就绪，无法发送消息");
            return false;
        }
    }

    public startAnswering() {
        this.sendDataChannelMessage("start");
    }

    public stopAnswering() {
        this.sendDataChannelMessage("stop");
    }

    public getDataChannelStatus(): { exists: boolean; readyState: string | null; open: boolean } {
        return {
            exists: !!this.dc,
            readyState: this.dc?.readyState || null,
            open: this.dc?.readyState === "open"
        };
    }

    public getConnectionState(): string | null {
        return this.pc?.connectionState || null;
    }

    public addConnectionStateListener(callback: (state: string) => void): () => void {
        if (!this.pc) {
            return () => {};
        }

        const handleStateChange = () => {
            callback(this.pc?.connectionState || 'unknown');
        };

        this.pc.addEventListener('connectionstatechange', handleStateChange);
        
        // 立即调用一次以获取当前状态
        handleStateChange();
        
        return () => {
            this.pc?.removeEventListener('connectionstatechange', handleStateChange);
        };
    }

    public close() {
        if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
            this.connectionTimeout = null;
        }

        if (this.pc) {
            this.pc.close();
            this.pc = null;
        }

        if (this.dc) {
            this.dc.close();
            this.dc = null;
        }

        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }

        if (this.remoteStream) {
            this.remoteStream.getTracks().forEach((track) => track.stop());
            this.remoteStream = null;
        }

        this.sessionId = null;
        console.log("[WebRTCPlayer] 连接已关闭，资源已释放");
    }
}
