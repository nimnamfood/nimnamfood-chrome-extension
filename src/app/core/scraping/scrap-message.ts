import { TabMessage } from '@/core/types';

export type ScrapMessage = Required<
  TabMessage<
    'scrap',
    { nameTarget: string; illustrationTarget: string; instructionsTarget: string }
  >
>;
