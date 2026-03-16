import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";

/* One audio per Surah, each from a different Qari.
 * Add your audio file in public/audio/surah-al-baqarah/ and set audioSrc.
 * For download before upload: use downloadUrl (e.g. Google Drive direct link). */
const DRIVE_AL_FATIHAH_ID = "15vZd-IpDYFia-YmbnOCneDFDmPNGx8oh";
const DRIVE_AL_BAQARAH_ID = "1LjCPDmsdyyu28G3Kp3rKB8hCP6PvP3nI";

const FALLBACK_SAMPLE_URL =
  "https://raw.githubusercontent.com/mathiasbynens/small/master/mp3.mp3";

const RECITATIONS = [
  {
    id: "al-fatihah-islam-sobhi",
    surahName: "Surah Al-Fatihah",
    qariName: "Islam Sobhi",
    qariImage: "/audio/surah-al-fatihah/islam-sobhi.png",
    audioSrc:
      "https://ia801604.us.archive.org/13/items/islam-sobhi_202603/Islam-Sobhi.mp3",
    downloadUrl:
      "https://ia801604.us.archive.org/13/items/islam-sobhi_202603/Islam-Sobhi.mp3",
  },
  {
    id: "al-baqarah-abdul-basit",
    surahName: "Surah Al-Baqarah",
    qariName: "Abdul Basit Abdul Samad",
    qariImage: "/audio/surah-al-baqarah/abdul-basit.png",
    audioSrc:
      "https://ia600702.us.archive.org/2/items/abdul-basit-abdul-samad_202603/Abdul-Basit-Abdul-Samad.mp3",
    downloadUrl:
      "https://ia600702.us.archive.org/2/items/abdul-basit-abdul-samad_202603/Abdul-Basit-Abdul-Samad.mp3",
  },
  {
    id: "al-imran-m-siddiq-al-manshawi",
    surahName: "Surah Al-Imran",
    qariName: "M. Siddiq Al-Manshawi",
    qariImage: "/audio/surah-al-imran/m-siddiq-al-manshawi.png",
    audioSrc:
      "https://ia800502.us.archive.org/22/items/m.-siddiq-al-manshawi/M.-Siddiq-Al-Manshawi.mp3",
    downloadUrl:
      "https://ia800502.us.archive.org/22/items/m.-siddiq-al-manshawi/M.-Siddiq-Al-Manshawi.mp3",
  },
  {
    id: "an-nisa-mahmood-ali-al-banna",
    surahName: "Surah An-Nisa",
    qariName: "Mahmood Ali Al Banna",
    qariImage: "/audio/surah-an-nisa/mahmood-ali-al-banna.png",
    audioSrc:
      "https://ia600106.us.archive.org/2/items/mahmood-ali-al-banna/Mahmood-Ali-Al-Banna.mp3",
    downloadUrl:
      "https://ia600106.us.archive.org/2/items/mahmood-ali-al-banna/Mahmood-Ali-Al-Banna.mp3",
  },
  {
    id: "al-maidah-mehmood-al-tablawi",
    surahName: "Surah Al-Ma'idah",
    qariName: "Mehmood Al Tablawi",
    qariImage: "/audio/surah-al-maidah/mehmood-al-tablawi.png",
    audioSrc:
      "https://ia600702.us.archive.org/15/items/mehmood-al-tablawi_202603/Mehmood-Al-Tablawi.mp3",
    downloadUrl:
      "https://ia600702.us.archive.org/15/items/mehmood-al-tablawi_202603/Mehmood-Al-Tablawi.mp3",
  },
  {
    id: "al-anam-mehmood-al-hasri",
    surahName: "Surah Al-An'am",
    qariName: "Mehmood Al Hasri",
    qariImage: "/audio/surah-al-anam/mehmood-al-hasri.png",
    audioSrc:
      "https://ia601602.us.archive.org/10/items/mehmood-al-hasri/Mehmood-Al-Hasri.mp3",
    downloadUrl:
      "https://ia601602.us.archive.org/10/items/mehmood-al-hasri/Mehmood-Al-Hasri.mp3",
    // downloadUrl optional: agar Drive link ho to yahan add karein
  },
  {
    id: "al-araf-shahat-anwar",
    surahName: "Surah Al-A'raf",
    qariName: "Shahat Anwar",
    qariImage: "/audio/surah-al-a'raf/shahat-anwar.png",
    audioSrc:
      "https://ia600805.us.archive.org/13/items/shahat-anwar/Shahat-Anwar.mp3",
    downloadUrl:
      "https://ia600805.us.archive.org/13/items/shahat-anwar/Shahat-Anwar.mp3",
  },
  {
    id: "al-anfal-saud-al-shuraim",
    surahName: "Surah Al-Anfal",
    qariName: "Saud Al Shuraim",
    qariImage: "/audio/surah-al-anfal/saud-al-shuraim.png",
    audioSrc:
      "https://ia601607.us.archive.org/24/items/saud-al-shuraim_202603/Saud-Al-Shuraim.mp3",
    downloadUrl:
      "https://ia601607.us.archive.org/24/items/saud-al-shuraim_202603/Saud-Al-Shuraim.mp3",
  },
  {
    id: "at-tawbah-abdullah-kahayyat",
    surahName: "Surah At-Tawbah",
    qariName: "Abdullah Kahayyat",
    qariImage: "/audio/surah-al-tawbah/abdullah-kahayyat.png",
    audioSrc:
      "https://ia600701.us.archive.org/16/items/abdullah-kahayyat/Abdullah-Kahayyat.mp3",
    downloadUrl:
      "https://ia600701.us.archive.org/16/items/abdullah-kahayyat/Abdullah-Kahayyat.mp3",
  },
  {
    id: "yunus-abdul-rashid-soufi",
    surahName: "Surah Yunus",
    qariName: "Abdul Rashid Soufi",
    qariImage: "/audio/surah-yunus/abdul-rashid-soufi.png",
    audioSrc:
      "https://ia600701.us.archive.org/12/items/abdul-rashid-soufi/Abdul-Rashid-Soufi.mp3",
    downloadUrl:
      "https://ia600701.us.archive.org/12/items/abdul-rashid-soufi/Abdul-Rashid-Soufi.mp3",
  },
  {
    id: "hud-taufiq-al-saigh",
    surahName: "Surah Hud",
    qariName: "Taufiq Al Saigh",
    qariImage: "/audio/surah-hud/taufiq-al-saigh.png",
    audioSrc:
      "https://ia601903.us.archive.org/9/items/taufiq-al-saigh/Taufiq-Al-Saigh.mp3",
    downloadUrl:
      "https://ia601903.us.archive.org/9/items/taufiq-al-saigh/Taufiq-Al-Saigh.mp3",
  },
  {
    id: "yusuf-wadi-al-yamani",
    surahName: "Surah Yusuf",
    qariName: "Wadi Al Yamani",
    qariImage: "/audio/surah-yusuf/wadi-al-yamani.png",
    audioSrc:
      "https://ia601505.us.archive.org/19/items/wadi-al-yamani_202603/Wadi-Al-Yamani.mp3",
    downloadUrl:
      "https://ia601505.us.archive.org/19/items/wadi-al-yamani_202603/Wadi-Al-Yamani.mp3",
  },
  {
    id: "ar-rad-mashaari-alafasi",
    surahName: "Surah Ar-Ra'd",
    qariName: "Mashaari Alafasi",
    qariImage: "/audio/surah-ar-ra'd/mashaari-alafasi.png",
    audioSrc:
      "https://dn711105.ca.archive.org/0/items/mashaari-alafasi_202603/Mashaari-Alafasi.mp3",
    downloadUrl:
      "https://dn711105.ca.archive.org/0/items/mashaari-alafasi_202603/Mashaari-Alafasi.mp3",
  },
  {
    id: "ibrahim-saad-al-ghamdi",
    surahName: "Surah Ibrahim",
    qariName: "Saad Al Ghamdi",
    qariImage: "/audio/surah-ibrahim/saad-al-ghamdi.png",
    audioSrc:
      "https://ia601608.us.archive.org/29/items/saad-al-ghamdi_202603/Saad-Al-Ghamdi.mp3",
    downloadUrl:
      "https://ia601608.us.archive.org/29/items/saad-al-ghamdi_202603/Saad-Al-Ghamdi.mp3",
  },
  {
    id: "al-hijr-ali-saleh-jabir",
    surahName: "Surah Al-Hijr",
    qariName: "Ali Saleh Jabir",
    qariImage: "/audio/surah-al-hijr/ali-saleh-jabir.png",
    audioSrc:
      "https://ia601806.us.archive.org/16/items/ali-saleh-jabir/Ali-Saleh-Jabir.mp3",
    downloadUrl:
      "https://ia601806.us.archive.org/16/items/ali-saleh-jabir/Ali-Saleh-Jabir.mp3",
  },
  {
    id: "an-nahl-khalid-jalil",
    surahName: "Surah An-Nahl",
    qariName: "Khalid Jalil",
    qariImage: "/audio/surah-an-nahl/khalid-jalil.jpg",
    audioSrc:
      "https://ia903202.us.archive.org/31/items/khalid-jalil/Khalid-Jalil.mp3",
    downloadUrl:
      "https://ia903202.us.archive.org/31/items/khalid-jalil/Khalid-Jalil.mp3",
  },
  {
    id: "al-isra-abdul-rehman-al-sudais",
    surahName: "Surah Al-Isra",
    qariName: "Abdul Rehman Al Sudais",
    qariImage: "/audio/surah-al-isra/abdul-rehman-al-sudais.jpg",
    audioSrc:
      "https://ia600603.us.archive.org/4/items/abdul-rehman-al-sudais_202603/Abdul-Rehman-Al-Sudais.mp3",
    downloadUrl:
      "https://ia600603.us.archive.org/4/items/abdul-rehman-al-sudais_202603/Abdul-Rehman-Al-Sudais.mp3",
  },
  {
    id: "al-kahf-abu-bakar-al-shatiri",
    surahName: "Surah Al-Kahf",
    qariName: "Abu Bakar Al Shatiri",
    qariImage: "/audio/surah-al-kahf/abu-bakar-al-shatiri.jpg",
    audioSrc:
      "https://ia903202.us.archive.org/7/items/abu-bakar-al-shatiri/Abu-Bakar-Al-Shatiri.mp3",
    downloadUrl:
      "https://ia903202.us.archive.org/7/items/abu-bakar-al-shatiri/Abu-Bakar-Al-Shatiri.mp3",
  },
  {
    id: "maryam-ahmad-al-tarablisi",
    surahName: "Surah Maryam",
    qariName: "Ahmad Al Tarablisi",
    qariImage: "/audio/surah-maryam/ahmad-al-tarablisi.jpg",
    audioSrc:
      "https://ia600101.us.archive.org/21/items/ahmad-al-tarablisi/Ahmad-Al-Tarablisi.mp3",
    downloadUrl:
      "https://ia600101.us.archive.org/21/items/ahmad-al-tarablisi/Ahmad-Al-Tarablisi.mp3",
  },
  {
    id: "ta-ha-raad-al-kurdi",
    surahName: "Surah Ta-Ha",
    qariName: "Ra'ad Al Kurdi",
    qariImage: "/audio/surah ta-ha/raad-al-kurdi.jpg",
    audioSrc:
      "https://ia600908.us.archive.org/6/items/raad-al-kurdi_202603/Ra%27ad-Al-Kurdi.mp3",
    downloadUrl:
      "https://ia600908.us.archive.org/6/items/raad-al-kurdi_202603/Ra%27ad-Al-Kurdi.mp3",
  },
  {
    id: "al-anbiya-faris-abbad",
    surahName: "Surah Al-Anbiya",
    qariName: "Faris Abbad",
    qariImage: "/audio/surah-al-anbiya/faris-abbad.jpg",
    audioSrc:
      "https://ia601402.us.archive.org/30/items/faris-abbad_202603/Faris-Abbad.mp3",
    downloadUrl:
      "https://ia601402.us.archive.org/30/items/faris-abbad_202603/Faris-Abbad.mp3",
  },
  {
    id: "al-hajj-hani-al-rafai",
    surahName: "Surah Al-Hajj",
    qariName: "Hani Al Rafai",
    qariImage: "/audio/surah-al-hajj/hani-al-rafai.jpg",
    audioSrc:
      "https://ia600402.us.archive.org/30/items/hani-al-rafai/Hani-Al-Rafai.mp3",
    downloadUrl:
      "https://ia600402.us.archive.org/30/items/hani-al-rafai/Hani-Al-Rafai.mp3",
  },
  {
    id: "al-muminun-mahir-al-muaiqli",
    surahName: "Surah Al-Mu'minun",
    qariName: "Mahir Al Muaiqli",
    qariImage: "/audio/surah-al-mu'minun/mahir-al-muaiqli.jpg",
    audioSrc:
      "https://ia600908.us.archive.org/31/items/mahir-al-muaiqli/Mahir-Al-Muaiqli.mp3",
    downloadUrl:
      "https://ia600908.us.archive.org/31/items/mahir-al-muaiqli/Mahir-Al-Muaiqli.mp3",
  },
  {
    id: "an-nur-muhammad-ayub",
    surahName: "Surah An-Nur",
    qariName: "Muhammad Ayub",
    qariImage: "/audio/surah-an-nur/muhammad-ayub.jpg",
    audioSrc:
      "https://ia600706.us.archive.org/28/items/muhammad-ayub_202603/Muhammad-Ayub.mp3",
    downloadUrl:
      "https://ia600706.us.archive.org/28/items/muhammad-ayub_202603/Muhammad-Ayub.mp3",
  },
  {
    id: "al-furqan-muhammad-jibreel",
    surahName: "Surah Al-Furqan",
    qariName: "Muhammad Jibreel",
    qariImage: "/audio/surah-al-furqan/muhammad-jibreel.jpg",
    audioSrc:
      "https://ia600504.us.archive.org/8/items/muhammad-jibreel/Muhammad-Jibreel.mp3",
    downloadUrl:
      "https://ia600504.us.archive.org/8/items/muhammad-jibreel/Muhammad-Jibreel.mp3",
  },
  {
    id: "ash-shuara-khalifa-al-tunaiji",
    surahName: "Surah Ash-Shu'ara",
    qariName: "Khalifa Al Tunaiji",
    qariImage: "/audio/surah-al-shu'ara/khalifa-al-tunaiji.jpg",
    audioSrc:
      "https://ia600600.us.archive.org/7/items/khalifa-al-tunaiji_202603/Khalifa-Al-Tunaiji.mp3",
    downloadUrl:
      "https://ia600600.us.archive.org/7/items/khalifa-al-tunaiji_202603/Khalifa-Al-Tunaiji.mp3",
  },
  {
    id: "an-naml-nabil-al-rafai",
    surahName: "Surah An-Naml",
    qariName: "Nabil Al Rafai",
    qariImage: "/audio/surah-an-naml/nabil-al-rafai.jpg",
    audioSrc:
      "https://ia601903.us.archive.org/6/items/nabil-al-rafai/Nabil-Al-Rafai.mp3",
    downloadUrl:
      "https://ia601903.us.archive.org/6/items/nabil-al-rafai/Nabil-Al-Rafai.mp3",
  },
  {
    id: "al-qasas-omer-al-qazabari",
    surahName: "Surah Al-Qasas",
    qariName: "Omer Al Qazabari",
    qariImage: "/audio/surah-al-qasas/omer-al-qazabari.jpg",
    audioSrc:
      "https://ia600509.us.archive.org/21/items/omer-al-qazabari/Omer-Al-Qazabari.mp3",
    downloadUrl:
      "https://ia600509.us.archive.org/21/items/omer-al-qazabari/Omer-Al-Qazabari.mp3",
  },
  {
    id: "al-ankabut-salah-al-budair",
    surahName: "Surah Al-Ankabut",
    qariName: "Salah Al Budair",
    qariImage: "/audio/surah-al-ankabut/salah-al-budair.jpg",
    audioSrc:
      "https://ia601404.us.archive.org/17/items/salah-al-budair_202603/Salah-Al-Budair.mp3",
    downloadUrl:
      "https://ia601404.us.archive.org/17/items/salah-al-budair_202603/Salah-Al-Budair.mp3",
  },
  {
    id: "ar-rum-salaj-bukatir",
    surahName: "Surah Ar-Rum",
    qariName: "Salaj Bukatir",
    qariImage: "/audio/surah-ar-rum/salaj-bukatir.jpg",
    audioSrc:
      "https://ia601903.us.archive.org/27/items/salaj-bukatir/Salaj-Bukatir.mp3",
    downloadUrl:
      "https://ia601903.us.archive.org/27/items/salaj-bukatir/Salaj-Bukatir.mp3",
  },
  {
    id: "luqman-ahmad-al-ajmi",
    surahName: "Surah Luqman",
    qariName: "Ahmad Al Ajmi",
    qariImage: "/audio/surah-luqman/ahmad-al-ajmi.png",
    audioSrc:
      "https://ia601904.us.archive.org/5/items/ahmad-al-ajmi_202603/Ahmad-Al-Ajmi.mp3",
    downloadUrl:
      "https://ia601904.us.archive.org/5/items/ahmad-al-ajmi_202603/Ahmad-Al-Ajmi.mp3",
  },
  {
    id: "as-sajdah-omer-hisham-al-arabi",
    surahName: "Surah As-Sajdah",
    qariName: "Omer Hisham Al Arabi",
    qariImage: "/audio/surah-as-sajdah/omer-hisham-al-arabi.png",
    audioSrc:
      "https://ia601402.us.archive.org/13/items/omer-hisham-al-arabi_202603/Omer-Hisham-Al-Arabi.mp3",
    downloadUrl:
      "https://ia601402.us.archive.org/13/items/omer-hisham-al-arabi_202603/Omer-Hisham-Al-Arabi.mp3",
  },
  {
    id: "al-ahzab-abdullah-basfar",
    surahName: "Surah Al-Ahzab",
    qariName: "Abdullah Basfar",
    qariImage: "/audio/surah-al-ahzab/abdullah-basfar.png",
    audioSrc:
      "https://ia600103.us.archive.org/26/items/abdullah-basfar_20260313/Abdullah-Basfar.mp3",
    downloadUrl:
      "https://ia600103.us.archive.org/26/items/abdullah-basfar_20260313/Abdullah-Basfar.mp3",
  },
  {
    id: "saba-yasir-al-dosri",
    surahName: "Surah Saba",
    qariName: "Yasir Al Dosri",
    qariImage: "/audio/surah-saba/yasir-al-dosri.png",
    audioSrc:
      "https://ia903203.us.archive.org/6/items/yasir-al-dosri_202603/Yasir-Al-Dosri.mp3",
    downloadUrl:
      "https://ia903203.us.archive.org/6/items/yasir-al-dosri_202603/Yasir-Al-Dosri.mp3",
  },
  {
    id: "fatir-zain-muhammad",
    surahName: "Surah Fatir",
    qariName: "Zain Muhammad",
    qariImage: "/audio/surah-fatir/zain-muhammad.png",
    audioSrc:
      "https://ia600407.us.archive.org/8/items/zain-muhammad_202603/Zain-Muhammad.mp3",
    downloadUrl:
      "https://ia600407.us.archive.org/8/items/zain-muhammad_202603/Zain-Muhammad.mp3",
  },
  {
    id: "ya-sin-zain-muhammad",
    surahName: "Surah Ya-Sin",
    qariName: "Zain Muhammad",
    qariImage: "/audio/surah-fatir/zain-muhammad.png",
    audioSrc:
      "https://ia601503.us.archive.org/25/items/zain-muhammad_20260313/Zain-Muhammad.mp3",
    downloadUrl:
      "https://ia601503.us.archive.org/25/items/zain-muhammad_20260313/Zain-Muhammad.mp3",
  },
  {
    id: "as-saaffat-mansour-al-salmi",
    surahName: "Surah As-Saaffat",
    qariName: "Mansour Al Salmi",
    qariImage: "/audio/surah-as-saaffat/mansour-al-salmi.png",
    audioSrc:
      "https://ia903207.us.archive.org/6/items/mansour-al-salmi_202603/Mansour-Al-Salmi.mp3",
    downloadUrl:
      "https://ia903207.us.archive.org/6/items/mansour-al-salmi_202603/Mansour-Al-Salmi.mp3",
  },
  {
    id: "saad-hazaa-al-baloushi",
    surahName: "Surah Saad",
    qariName: "Hazaa Al Baloushi",
    qariImage: "/audio/surah-saad/hazaa-al-baloushi.png",
    audioSrc:
      "https://ia601904.us.archive.org/24/items/hazaa-al-baloushi/Hazaa-Al-Baloushi.mp3",
    downloadUrl:
      "https://ia601904.us.archive.org/24/items/hazaa-al-baloushi/Hazaa-Al-Baloushi.mp3",
  },
  {
    id: "az-zumar-hazaa-al-baloushi",
    surahName: "Surah Az-Zumar",
    qariName: "Hazaa Al Baloushi",
    qariImage: "/audio/surah-az-zumar/hazaa-al-baloushi.png",
    audioSrc:
      "https://ia903204.us.archive.org/27/items/hazaa-al-baloushi-1/Hazaa-Al-Baloushi%20%281%29.mp3",
    downloadUrl:
      "https://ia903204.us.archive.org/27/items/hazaa-al-baloushi-1/Hazaa-Al-Baloushi%20%281%29.mp3",
  },
  {
    id: "ghafir-noreen-siddiq",
    surahName: "Surah Ghafir",
    qariName: "Noreen Siddiq",
    qariImage: "/audio/surah-ghafir/noreen-siddiq.png",
    audioSrc:
      "https://ia601503.us.archive.org/22/items/noreen-siddiq/Noreen-Siddiq.mp3",
    downloadUrl:
      "https://ia601503.us.archive.org/22/items/noreen-siddiq/Noreen-Siddiq.mp3",
  },
  {
    id: "fussilat-muayyid-al-mazin",
    surahName: "Surah Fussilat",
    qariName: "Muayyid Al Mazin",
    qariImage: "/audio/surah-fussilat/muayyid-al-mazin.png",
    audioSrc:
      "https://ia601404.us.archive.org/25/items/muayyid-al-mazin/Muayyid-Al-Mazin.mp3",
    downloadUrl:
      "https://ia601404.us.archive.org/25/items/muayyid-al-mazin/Muayyid-Al-Mazin.mp3",
  },
  {
    id: "ash-shura-hasan-saleh",
    surahName: "Surah Ash-Shura",
    qariName: "Hasan Saleh",
    qariImage: "/audio/surah-ash-shura/hasan-saleh.png",
    audioSrc:
      "https://ia903207.us.archive.org/26/items/hasan-saleh/Hasan-Saleh.mp3",
    downloadUrl:
      "https://ia903207.us.archive.org/26/items/hasan-saleh/Hasan-Saleh.mp3",
  },
  {
    id: "az-zukhruf-muhammad-al-shareef",
    surahName: "Surah Az-Zukhruf",
    qariName: "Muhammad Al Shareef",
    qariImage: "/audio/surah-az-zukhruf/muhammad-al-shareef.jpg",
    audioSrc:
      "/audio/surah-az-zukhruf/43 Az-Zukhruf (Muhmmad Al Shareef).mp3",
    downloadUrl:
      "/audio/surah-az-zukhruf/43 Az-Zukhruf (Muhmmad Al Shareef).mp3",
  },
  {
    id: "ad-dukhan-abdul-rehman-bin-mousa",
    surahName: "Surah Ad-Dukhan",
    qariName: "Abdul Rehman Bin Mousa",
    qariImage: "/audio/surah-ad-dukhan/abdul-rehman-bin-mousa.jpg",
    audioSrc:
      "/audio/surah-ad-dukhan/44 Ad-Dukhan (Abdul Rehman Bin Mousa).mp3",
    downloadUrl:
      "/audio/surah-ad-dukhan/44 Ad-Dukhan (Abdul Rehman Bin Mousa).mp3",
  },
];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function isArchiveUrl(url?: string): boolean {
  return Boolean(url?.includes("archive.org"));
}

function RecitationCard({
  id,
  number,
  surahName,
  qariName,
  qariImage,
  audioSrc,
  downloadUrl,
  isPlaying,
  onPlayRequest,
  onPauseRequest,
}: (typeof RECITATIONS)[0] & {
  number: number;
  isPlaying: boolean;
  onPlayRequest: (id: string) => void;
  onPauseRequest: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const showImage = qariImage && !imageError;
  const sourceUrl = downloadUrl || audioSrc;

  // When another card starts playing, pause this one
  useEffect(() => {
    if (!isPlaying && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      const fromArchive = isArchiveUrl(audioSrc);
      console.log("[Playlist] Playing audio", {
        surahName,
        qariName,
        sourceType: fromArchive ? "archive.org" : "project-file",
        audioSrc,
      });
      onPlayRequest(id);
      setPlaying(true);
      el.play().catch(() => {
        console.error("[Playlist] Playback failed", {
          surahName,
          qariName,
          sourceType: fromArchive ? "archive.org" : "project-file",
          audioSrc,
        });
        setPlaying(false);
        setAudioError(true);
      });
    } else {
      onPauseRequest();
      el.pause();
      setPlaying(false);
    }
  }, [id, onPlayRequest, onPauseRequest, audioSrc, qariName, surahName]);

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (el) setCurrentTime(el.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      setDuration(el.duration);
      if (isArchiveUrl(el.currentSrc || audioSrc)) {
        console.log("[Playlist] Archive.org audio ready", {
          surahName,
          qariName,
          currentSrc: el.currentSrc || audioSrc,
          duration: el.duration,
        });
      }
      if (el.src.includes("small") || el.src.includes("mathiasbynens"))
        setAudioError(false);
    }
  }, [audioSrc, qariName, surahName]);

  const handleEnded = useCallback(() => {
    onPauseRequest();
    setPlaying(false);
    setCurrentTime(0);
  }, [onPauseRequest]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = audioRef.current;
      if (!el || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      el.currentTime = x * duration;
    },
    [duration],
  );

  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    const url = downloadUrl || audioSrc;
    if (!url || downloading) return;
    const filename = `${qariName.replace(/\s+/g, "-")}.mp3`;
    const fromArchive = isArchiveUrl(url);

    console.log("[Playlist] Download requested", {
      surahName,
      qariName,
      sourceType: fromArchive ? "archive.org" : "project-file",
      downloadUrl: url,
      filename,
    });

    setDownloading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      console.log("[Playlist] Download started", {
        surahName,
        qariName,
        sourceType: fromArchive ? "archive.org" : "project-file",
        filename,
      });
    } catch {
      console.error("[Playlist] Download failed, opening URL directly", {
        surahName,
        qariName,
        sourceType: fromArchive ? "archive.org" : "project-file",
        downloadUrl: url,
      });
      // Fallback: open in new tab if fetch fails
      window.open(url, "_blank");
    } finally {
      setDownloading(false);
    }
  }, [downloadUrl, audioSrc, qariName, surahName, downloading]);

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Title row: subtle number + Surah name */}
      <h3 className="text-lg font-bold text-[#2C5F2D] px-4 pt-4 pb-1 flex items-center justify-center gap-2">
        <span className="text-[#C9A961] font-semibold tabular-nums">
          {number}.
        </span>
        <span className="line-clamp-2 text-center">{surahName}</span>
      </h3>

      {/* Qari image + name (click to play) */}
      <button
        type="button"
        onClick={togglePlay}
        className="w-full block text-left focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-inset rounded-lg"
      >
        <div className="relative aspect-square max-h-32 sm:max-h-36 mx-auto bg-gray-100">
          {showImage ? (
            <img
              src={qariImage}
              alt={qariName}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2C5F2D]/10 to-[#C9A961]/10 text-[#2C5F2D] text-2xl font-bold">
              {surahName.slice(0, 1)}
            </div>
          )}
        </div>
        <p className="text-center font-semibold text-gray-800 pt-2 pb-3 px-4">
          {qariName}
        </p>
      </button>

      {/* Play bar: left = Download, then progress + time */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className={`flex-shrink-0 w-9 h-9 rounded-full bg-[#C9A961]/20 text-[#2C5F2D] flex items-center justify-center hover:bg-[#C9A961]/30 transition-colors ${downloading ? "opacity-50 cursor-wait" : ""}`}
          title={downloading ? "Downloading..." : "Download"}
          aria-label={downloading ? "Downloading audio" : "Download audio"}
        >
          {downloading ? (
            <div className="w-4 h-4 border-2 border-[#2C5F2D] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
        </button>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2C5F2D] text-white flex items-center justify-center hover:bg-[#1e4620] transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <div
            className="flex-1 min-w-0 h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
            role="progressbar"
            aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#C9A961] rounded-full transition-all duration-150"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            />
          </div>
          <span className="flex-shrink-0 text-xs text-gray-500 tabular-nums min-w-[7rem] text-right whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => {
          if (isArchiveUrl(sourceUrl)) {
            console.error("[Playlist] Archive.org audio error", {
              surahName,
              qariName,
              audioSrc,
              usingFallback,
            });
          }
          if (!usingFallback) {
            setUsingFallback(true);
            setAudioError(true);
            const el = audioRef.current;
            if (el && FALLBACK_SAMPLE_URL) {
              el.src = FALLBACK_SAMPLE_URL;
              el.load();
            }
          }
        }}
      />
    </div>
  );
}

export function PlaylistPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="min-h-[60vh] pb-40 sm:pb-48 lg:pb-56">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#2C5F2D] to-[#4A8B4D] text-white min-h-[14rem] sm:min-h-[16rem] flex flex-col justify-center">
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#C9A961] to-[#8B7355] z-10"
          aria-hidden
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Playlist
          </h1>
          <div
            className="inline-block w-24 h-1.5 rounded-full bg-gradient-to-r from-[#C9A961] to-[#8B7355] mb-4"
            aria-hidden
          />
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            One Surah, one audio — each in a different Qari&apos;s voice. Click
            the image or Surah to play; use the bar to seek. Download from the
            left.
          </p>
        </div>
      </section>

      <div className="h-10 sm:h-14 bg-[#FAF8F4]" aria-hidden />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {RECITATIONS.map((rec, index) => (
            <RecitationCard
              key={rec.id}
              number={index + 1}
              {...rec}
              isPlaying={playingId === rec.id}
              onPlayRequest={(id) => setPlayingId(id)}
              onPauseRequest={() => setPlayingId(null)}
            />
          ))}
        </div>
        {RECITATIONS.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No recitations added yet. Add entries to the RECITATIONS array in
            PlaylistPage.tsx and place audio files in public/audio/.
          </p>
        )}
      </section>
      {/* Spacer so cards don't mix with footer */}
      <div className="h-16 sm:h-20 md:h-24 bg-[#FAF8F4]" aria-hidden />
    </div>
  );
}
