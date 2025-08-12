import { TabMessage } from '@/core/types';

export type ScrapMessage = TabMessage<
  'scrap',
  { nameTarget: string; illustrationTarget: string; instructionsTarget: string }
>;
