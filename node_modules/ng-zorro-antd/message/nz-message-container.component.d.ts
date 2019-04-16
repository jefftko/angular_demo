import { ChangeDetectorRef } from '@angular/core';
import { NzMessageConfig } from './nz-message-config';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
export declare class NzMessageContainerComponent {
    protected cdr: ChangeDetectorRef;
    messages: NzMessageDataFilled[];
    config: NzMessageConfig;
    constructor(cdr: ChangeDetectorRef, defaultConfig: NzMessageConfig, config: NzMessageConfig);
    setConfig(config: NzMessageConfig): void;
    createMessage(message: NzMessageDataFilled): void;
    removeMessage(messageId: string): void;
    removeMessageAll(): void;
    protected _mergeMessageOptions(options: NzMessageDataOptions): NzMessageDataOptions;
}
