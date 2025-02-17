import { SafeResourceUrl } from '@angular/platform-browser';


export interface Skill {
  title: string;
  descriptionTitle: string;
  description: string;
  videoId: SafeResourceUrl;
  tags: string[];
}
