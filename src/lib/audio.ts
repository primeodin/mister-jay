const MUTE_KEY = 'mister-jay-mute';

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    muted = localStorage.getItem(MUTE_KEY) === '1';
    if (!ctx) ctx = new AudioContext();
    return ctx;
  } catch {
    return null;
  }
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  localStorage.setItem(MUTE_KEY, value ? '1' : '0');
}

export function toggleMute(): boolean {
  setMuted(!muted);
  return muted;
}

function tone(freq: number, duration: number, type: OscillatorType, gain = 0.08) {
  const ac = getCtx();
  if (!ac || muted) return;
  if (ac.state === 'suspended') void ac.resume();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration);
}

function noiseBurst(duration: number, gain = 0.06) {
  const ac = getCtx();
  if (!ac || muted) return;
  if (ac.state === 'suspended') void ac.resume();
  const bufferSize = ac.sampleRate * duration;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ac.createBufferSource();
  const g = ac.createGain();
  source.buffer = buffer;
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  source.connect(g);
  g.connect(ac.destination);
  source.start();
}

export function playThunk() {
  tone(90, 0.12, 'square', 0.1);
  tone(55, 0.18, 'sine', 0.14);
}

export function playSpark() {
  noiseBurst(0.08, 0.09);
  tone(2200, 0.04, 'sawtooth', 0.03);
}

export function playSuccess() {
  tone(180, 0.08, 'sine', 0.06);
  tone(280, 0.12, 'sine', 0.05);
}

export function playFail() {
  tone(120, 0.2, 'square', 0.07);
}
