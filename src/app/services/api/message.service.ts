import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lean } from '../../types/entity-types';
import { HTTPWrapper } from './http-wrapper';
import { WSService } from '../ws.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends HTTPWrapper<Lean.Message> {
  protected readonly endpoint = environment.endpoint + '/channels';
  private cached = new Map<string, Lean.Message[]>();
  public self = undefined;

  protected arr: Lean.Message[];
  public get messages(): Lean.Message[] {
    return this.arr = Array
      .from(this.cached.values())
      .flat();
  }

  constructor(
    http: HttpClient,
    ws: WSService,
  ) { super(http, ws); }

  public overrideGetAsync(channelId: string, messageId: string) {
    if (!channelId || !messageId) return null;
    
    return this.getCached(messageId)
      ?? this.overrideFetch(channelId, messageId);
  }

  public async getAllAsync(channelId: string): Promise<Lean.Message[]> {    
    return this.cached.get(channelId)
      ?? await this.overrideFetchAll(channelId);
  }

  public getAllCached(channelId: string): Lean.Message[] {
    return this.cached.get(channelId)
      ?? this.cached
        .set(channelId, [])
        .get(channelId);
  }

  // TODO: eventually use override keyword
  public overrideAdd(messages: Lean.Message[]): Lean.Message[] {    
    const channelId = messages[0]?.channelId;
    if (!channelId) return [];

    const cached = this.getAllCached(channelId);
    cached.push(...messages);
    return cached;
  }

  // TODO: eventually use override keyword
  public overrideFetch(channelId: string, messageId: string): Promise<Lean.Message> {
    return this.http
      .get(`${this.endpoint}/${channelId}/messages/${messageId}`, this.headers)
      .toPromise() as any;
  }

  // TODO: eventually use override keyword
  public async overrideFetchAll(channelId: string, options?: LazyLoadOptions): Promise<Lean.Message[]> {
    const query = `?start=${options?.start ?? 0}&end=${options?.end ?? 25}`;
    const messages = await this.http
      .get(`${this.endpoint}/${channelId}/messages${query}`, this.headers)
      .toPromise() as any;
    
    return this.overrideAdd(messages);
  }
}

interface LazyLoadOptions { start: number, end: number }
