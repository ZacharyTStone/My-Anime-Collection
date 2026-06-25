import type { Meta, StoryObj } from "@storybook/react-vite";
import AiRecommendationsModal from "../AiRecommendationsModal";
import { AiRecommendation } from "../../../../utils/types";

const sampleResults: AiRecommendation[] = [
  {
    title: "Frieren: Beyond Journey's End",
    japanese_title: "葬送のフリーレン",
    reason: "Its quiet, melancholic pacing and focus on the passage of time echo the emotional depth you enjoy.",
    reason_jp: "静かで切ない展開と時の流れへの眼差しが、あなたの好みに響きます。",
  },
  {
    title: "Mushishi",
    japanese_title: "蟲師",
    reason: "Episodic, atmospheric storytelling with a gentle, contemplative tone.",
    reason_jp: "一話完結の幻想的な物語と穏やかで思索的な雰囲気が魅力です。",
  },
  {
    title: "Violet Evergarden",
    japanese_title: "ヴァイオレット・エヴァーガーデン",
    reason: "Gorgeous animation paired with a deeply human story about learning to feel.",
    reason_jp: "美しい作画と、感情を学んでいく人間味あふれる物語が組み合わさっています。",
  },
];

const meta = {
  title: "UI/AiRecommendationsModal",
  component: AiRecommendationsModal,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AiRecommendationsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Results: Story = {
  args: { loading: false, error: false, results: sampleResults, onClose: () => {} },
};

export const Loading: Story = {
  args: { loading: true, error: false, results: [], onClose: () => {} },
};

export const ErrorState: Story = {
  args: { loading: false, error: true, results: [], onClose: () => {} },
};

export const Empty: Story = {
  args: { loading: false, error: false, results: [], onClose: () => {} },
};
