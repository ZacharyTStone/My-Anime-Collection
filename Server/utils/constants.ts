import { v4 as uuidv4 } from "uuid";
import Playlist, { PlaylisDocument } from "../models/Playlists.js";

export const DEMO_USER = {
  name: "Demo",
  is_demo_user: true,
  email: `DemoUser${uuidv4()}@demo.com`,
  password: uuidv4(),
};

export const SEED_ANIMES: any[] = [
  {
    creationDate: "1989-04-26T00:00:00.000Z",
    id: 720,
    title: "Dragon Ball Z",
    japanese_title: "ドラゴンボールZ",
    rating: 82.01,
    format: "TV",
    episodeCount: 291,
    synopsis:
      "Five years after winning the World Martial Arts tournament, Gokuu is now living a peaceful life with his wife and son. This changes, however, with the arrival of a mysterious enemy named Raditz who presents himself as Gokuu's long-lost brother. He reveals that Gokuu is a warrior from the once powerful but now virtually extinct Saiyan race, whose homeworld was completely annihilated. When he was sent to Earth as a baby, Gokuu's sole purpose was to conquer and destroy the planet; but after suffering amnesia from a head injury, his violent and savage nature changed, and instead was raised as a kind and well-mannered boy, now fighting to protect others.\n" +
      "With his failed attempt at forcibly recruiting Gokuu as an ally, Raditz warns Gokuu's friends of a new threat that's rapidly approaching Earth—one that could plunge Earth into an intergalactic conflict and cause the heavens themselves to shake. A war will be fought over the seven mystical dragon balls, and only the strongest will survive in Dragon Ball Z.\n" +
      "[Written by MAL Rewrite]",
    coverImage: "https://media.kitsu.io/anime/poster_images/720/small.jpg",
    youtubeVideoId: "b5mKTXse_gQ",
    playlistID: "2",
    isDemoAnime: true,
  },
  {
    creationDate: "2014-07-04T00:00:00.000Z",
    id: 8271,
    title: "Tokyo Ghoul",
    japanese_title: "東京喰種-トーキョーグール-",
    rating: 80.2,
    format: "TV",
    episodeCount: 12,
    synopsis:
      "Tokyo has become a cruel and merciless city—a place where vicious creatures called “ghouls” exist alongside humans. The citizens of this once great metropolis live in constant fear of these bloodthirsty savages and their thirst for human flesh. However, the greatest threat these ghouls pose is their dangerous ability to masquerade as humans and blend in with society.\n" +
      "Based on the best-selling supernatural horror manga by Sui Ishida, Tokyo Ghoul follows Ken Kaneki, a shy, bookish college student, who is instantly drawn to Rize Kamishiro, an avid reader like himself. However, Rize is not exactly who she seems, and this unfortunate meeting pushes Kaneki into the dark depths of the ghouls' inhuman world. In a twist of fate, Kaneki is saved by the enigmatic waitress Touka Kirishima, and thus begins his new, secret life as a half-ghoul/half-human who must find a way to integrate into both societies.\n" +
      "[Written by MAL Rewrite]",
    coverImage: "https://media.kitsu.io/anime/poster_images/8271/small.jpg",
    youtubeVideoId: "vGuQeQsoRgU",
    playlistID: "0",
    isDemoAnime: true,
  },
  {
    creationDate: "2023-10-07T00:00:00.000Z",
    id: 46873,
    title: "SPY × FAMILY Season 2",
    japanese_title: "SPY×FAMILY Season 2",
    rating: 85.41,
    format: "TV",
    episodeCount: 12,
    synopsis: "The second season of SPY×FAMILY.",
    coverImage:
      "https://media.kitsu.io/anime/46873/poster_image/small-4014254a3fdbd98ac825c53a94fbd2a3.jpeg",
    youtubeVideoId: "W2tMsaAVjD0",
    playlistID: "1",
    isDemoAnime: true,
  },
  {
    creationDate: "1995-10-04T00:00:00.000Z",
    id: 21,
    title: "Neon Genesis Evangelion",
    japanese_title: "新世紀エヴァンゲリオン",
    rating: 82.05,
    format: "TV",
    episodeCount: 26,
    synopsis:
      "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of Nerv, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin. Gendou Ikari, head of the organization, seeks compatible pilots who can synchronize with the Evangelions and realize their true potential. Aiding in this defensive endeavor are talented personnel Misato Katsuragi, Head of Tactical Operations, and Ritsuko Akagi, Chief Scientist.\n" +
      "\n" +
      "Face to face with his father for the first time in years, 14-year-old Shinji Ikari's average life is irreversibly changed when he is whisked away into the depths of Nerv, and into a harrowing new destiny—he must become the pilot of Evangelion Unit-01 with the fate of mankind on his shoulders.\n" +
      "Written by Hideaki Anno, Neon Genesis Evangelion is a heroic tale of a young boy who will become a legend. But as this psychological drama unfolds, ancient secrets beneath the big picture begin to bubble to the surface...\n" +
      "\n" +
      "(Source: MAL Rewrite)",
    coverImage:
      "https://media.kitsu.io/anime/21/poster_image/small-6662f66b53b64098d873e037b3f59bd2.jpeg",
    youtubeVideoId: "qW5DCdRp3rk",
    playlistID: "2",
    isDemoAnime: true,
  },
  {
    creationDate: "2010-04-03T00:00:00.000Z",
    id: 4604,
    title: "Angel Beats!",
    japanese_title: "Angel Beats!（エンジェルビーツ）",
    rating: 81.35,
    format: "TV",
    episodeCount: 13,
    synopsis:
      "Otonashi awakens only to learn he is dead. A rifle-toting girl named Yuri explains that they are in the afterlife, and Otonashi realizes the only thing he can remember about himself is his name. Yuri tells him that she leads the Shinda Sekai Sensen (Afterlife Battlefront) and wages war against a girl named Tenshi. Unable to believe Yuri's claims that Tenshi is evil, Otonashi attempts to speak with her, but the encounter doesn't go as he intended.\n" +
      "Otonashi decides to join the SSS and battle Tenshi, but he finds himself oddly drawn to her. While trying to regain his memories and understand Tenshi, he gradually unravels the mysteries of the afterlife.\n" +
      "[Written by MAL Rewrite]",
    coverImage: "https://media.kitsu.io/anime/poster_images/4604/small.jpg",
    youtubeVideoId: "zkY-sG6crKI",
    playlistID: "2",
    isDemoAnime: true,
  },
  {
    creationDate: "2006-10-04T00:00:00.000Z",
    id: 1376,
    title: "Death Note",
    japanese_title: "デスノート",
    rating: 83.57,
    format: "TV",
    episodeCount: 37,
    synopsis:
      "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm.\n" +
      "\n" +
      "High school student and prodigy Light Yagami stumbles upon the Death Note and—since he deplores the state of the world—tests the deadly notebook by writing a criminal's name in it. When the criminal dies immediately following his experiment with the Death Note, Light is greatly surprised and quickly recognizes how devastating the power that has fallen into his hands could be.\n" +
      "\n" +
      "With this divine capability, Light decides to extinguish all criminals in order to build a new world where crime does not exist and people worship him as a god. Police, however, quickly discover that a serial killer is targeting criminals and, consequently, try to apprehend the culprit. To do this, the Japanese investigators count on the assistance of the best detective in the world: a young and eccentric man known only by the name of L.\n" +
      "\n" +
      "(Source: MAL Rewrite)",
    coverImage: "https://media.kitsu.io/anime/poster_images/1376/small.jpg",
    youtubeVideoId: "NlJZ-YgAt-c",
    playlistID: "2",
    isDemoAnime: true,
  },
  {
    creationDate: "2013-04-07T00:00:00.000Z",
    id: 7442,
    title: "Attack on Titan",
    japanese_title: "進撃の巨人",
    rating: 84.87,
    format: "TV",
    episodeCount: 25,
    synopsis:
      "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\n" +
      "\n" +
      "After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Based on Hajime Isayama's award-winning manga, Shingeki no Kyojin follows Eren, along with his adopted sister Mikasa Ackerman and his childhood friend Armin Arlert, as they join the brutal war against the titans and race to discover a way of defeating them before the last walls are breached.\n" +
      "\n" +
      "(Source: MAL Rewrite)",
    coverImage: "https://media.kitsu.io/anime/poster_images/7442/small.jpg",
    youtubeVideoId: "LHtdKWJdif4",
    playlistID: "2",
    isDemoAnime: true,
  },
  {
    creationDate: "2018-10-02T00:00:00.000Z",
    id: 41024,
    title: "That Time I Got Reincarnated as a Slime",
    japanese_title: "転生したらスライムだった件",
    rating: 82.05,
    format: "TV",
    episodeCount: 24,
    synopsis:
      "Corporate worker Mikami Satoru is stabbed by a random killer, and is reborn to an alternate world. But he turns out to be reborn a slime! Thrown into this new world with the name Rimuru, he begins his quest to create a world that’s welcoming to all races.\n" +
      "\n" +
      "(Source: Crunchyroll)",
    coverImage: "https://media.kitsu.io/anime/poster_images/41024/small.jpg",
    youtubeVideoId: "bXCCKubabe0",
    playlistID: "1",
    isDemoAnime: true,
  },
  {
    creationDate: "2012-10-12T00:00:00.000Z",
    id: 7000,
    title: "Psycho-Pass",
    japanese_title: "サイコパス",
    rating: 82,
    format: "TV",
    episodeCount: 22,
    synopsis:
      "Justice, and the enforcement of it, has changed. In the 22nd century, Japan enforces the Sibyl System, an objective means of determining the threat level of each citizen by examining their mental state for signs of criminal intent, known as their Psycho-Pass. Inspectors uphold the law by subjugating, often with lethal force, anyone harboring the slightest ill-will; alongside them are Enforcers, jaded Inspectors that have become latent criminals, granted relative freedom in exchange for carrying out the Inspectors' dirty work.\n" +
      "Into this world steps Akane Tsunemori, a young woman with an honest desire to uphold justice. However, as she works alongside veteran Enforcer Shinya Kougami, she soon learns that the Sibyl System's judgments are not as perfect as her fellow Inspectors assume. With everything she has known turned on its head, Akane wrestles with the question of what justice truly is, and whether it can be upheld through the use of a system that may already be corrupt.\n" +
      "[Written by MAL Rewrite]",
    coverImage: "https://media.kitsu.io/anime/poster_images/7000/small.jpg",
    youtubeVideoId: "70zW21l5ZUU",
    playlistID: "1",
    isDemoAnime: true,
  },
  {
    creationDate: "1999-06-30T00:00:00.000Z",
    id: 220,
    title: "Great Teacher Onizuka",
    japanese_title: "グレート・ティーチャー・オニヅカ",
    rating: 81.98,
    format: "TV",
    episodeCount: 43,
    synopsis:
      "Onizuka is a reformed biker gang leader who has his sights set on an honorable new ambition: to become the world's greatest teacher... for the purpose of meeting sexy high school girls. Okay, so he's mostly reformed.\n" +
      "However, strict administrators and a class of ruthless delinquents stand between Onizuka and his goal and they will use any means, however illegal or low, to drive the new teacher away. Perfect, because Onizuka's methods won't be found in any teaching manual; he cares about the difference between legal and illegal activities about as much as he cares for the age difference between himself and a high school girl.\n" +
      "So get ready for math that doesn't add up, language you'd be slapped for using, and biology that would make a grown man blush... unless of course, you're the Great Teacher Onizuka.\n" +
      "[Written by MAL Rewrite]",
    coverImage: "https://media.kitsu.io/anime/poster_images/220/small.jpg",
    youtubeVideoId: "N/A",
    playlistID: "3",
    isDemoAnime: true,
  },
];

export const DEFAULT_PLAYLISTS: any[] = [
  {
    title: "Currently Watching",
    id: "0",
    userID: "",
  },
  {
    title: "Want to Watch",
    id: "1",
    userID: "",
  },
  {
    title: "My All Time Favorites ❤️",
    id: "2",
    userID: "",
  },
];
