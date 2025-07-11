import { WorkerEntrypoint } from 'cloudflare:workers';
import { ProxyToSelf } from 'workers-mcp';

export interface Env {
  LLM_ENDPOINT: string;
  SHARED_SECRET: string;
}

export default class LLMWorker extends WorkerEntrypoint<Env> {
  async callLLM(payload: unknown): Promise<Response> {
    return fetch(this.env.LLM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  async fetch(request: Request): Promise<Response> {
    return new ProxyToSelf(this).fetch(request);
  }
}
