import playbooksData from "../../data/playbooks.json";

export type Playbook = {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  category: "research" | "ads" | "nurture" | "ops";
  goal_tags: string[];
  channel_tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  region_tags: string[];
  outcome_text: string;
  who_this_is_for: string;
  prerequisites: string[];
  time_to_deploy: string;
  before_bullets: string[];
  after_bullets: string[];
  how_steps: string[];
  what_you_get: string[];
  technical_details: string;
  gumroad_url: string;
  price_usd: number;
};

export function getPlaybooks(): Playbook[] {
  return playbooksData as Playbook[];
}
