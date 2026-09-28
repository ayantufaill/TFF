import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import patternBg from "../assets/home/pattern-bg.jpg";

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
      "https://ia600409.us.archive.org/5/items/muhammad-al-shareef/Muhammad-Al-Shareef.mp3",
    downloadUrl:
      "https://ia600409.us.archive.org/5/items/muhammad-al-shareef/Muhammad-Al-Shareef.mp3",
  },
  {
    id: "ad-dukhan-abdul-rehman-bin-mousa",
    surahName: "Surah Ad-Dukhan",
    qariName: "Abdul Rehman Bin Mousa",
    qariImage: "/audio/surah-ad-dukhan/abdul-rehman-bin-mousa.jpg",
    audioSrc:
      "https://ia601402.us.archive.org/33/items/abdul-rehman-bin-mousa/Abdul-Rehman-Bin-Mousa.mp3",
    downloadUrl:
      "https://ia601402.us.archive.org/33/items/abdul-rehman-bin-mousa/Abdul-Rehman-Bin-Mousa.mp3",
  },
  {
    id: "al-jathiyah-nasir-al-qatami",
    surahName: "Surah Al-Jathiyah",
    qariName: "Nasir Al Qatami",
    qariImage: "/audio/surah-al-jathiyah/nasir-al-qatami.jpg",
    audioSrc:
      "https://ia902900.us.archive.org/32/items/nasir-al-qatami/Nasir-Al-Qatami.mp3",
    downloadUrl:
      "https://ia902900.us.archive.org/32/items/nasir-al-qatami/Nasir-Al-Qatami.mp3",
  },
  {
    id: "al-ahqaf-younus-solis",
    surahName: "Surah Al-Ahqaf",
    qariName: "Younus Solis",
    qariImage: "/audio/surah-al-ahqaf/younus-solis.jpg",
    audioSrc:
      "https://ia903102.us.archive.org/27/items/younus-solis/Younus-Solis.mp3",
    downloadUrl:
      "https://ia903102.us.archive.org/27/items/younus-solis/Younus-Solis.mp3",
  },
  {
    id: "muhammad-abdul-kareem-al-hazmi",
    surahName: "Surah Muhammad",
    qariName: "Abdul Kareem Al Hazmi",
    qariImage: "/audio/surah-muhammad/abdul-kareem-al-hazmi.jpg",
    audioSrc: "/audio/surah-muhammad/47 Muhammad (Abdul Kareem Al Hazmi).mp3",
    downloadUrl:
      "/audio/surah-muhammad/47 Muhammad (Abdul Kareem Al Hazmi).mp3",
  },
  {
    id: "al-fath-islam-sobhi-48",
    surahName: "Surah Al-Fath",
    qariName: "Islam Sobhi",
    qariImage: "/audio/surah-al-fath/islam-sobhi.jpg",
    audioSrc: "/audio/surah-al-fath/48 Al-Fath الفتح (Islam Sobhi).mp3",
    downloadUrl: "/audio/surah-al-fath/48 Al-Fath الفتح (Islam Sobhi).mp3",
  },
  {
    id: "al-hujurat-abdul-rehman-mosad",
    surahName: "Surah Al-Hujurat",
    qariName: "Abdul Rehman Mosad",
    qariImage: "/audio/surah-al-hujurat/abdul-rehman-mosad.jpg",
    audioSrc:
      "/audio/surah-al-hujurat/49 Al-Hujurat الحجرات (Abdul Rehman Mosad).mp3",
    downloadUrl:
      "/audio/surah-al-hujurat/49 Al-Hujurat الحجرات (Abdul Rehman Mosad).mp3",
  },
  {
    id: "qaf-abdul-basit-abdul-samad-50",
    surahName: "Surah Qaf",
    qariName: "Abdul Basit Abdul Samad",
    qariImage: "/audio/surah-qaf/abdul-basit-abdul-samad.jpg",
    audioSrc: "/audio/surah-qaf/50 Qaf (Abdul Basit Abdul Samad).mp3",
    downloadUrl: "/audio/surah-qaf/50 Qaf (Abdul Basit Abdul Samad).mp3",
  },
  {
    id: "adh-dhariyat-m-siddiq-al-manshawi-51",
    surahName: "Surah Adh-Dhariyat",
    qariName: "Muhmmad Siddiq al Manshawi",
    qariImage:
      "/audio/surah-adh-dhariyat/m-siddiq-al-manshawi-adh-dhariyat.jpg",
    audioSrc:
      "/audio/surah-adh-dhariyat/51 Adh-Dhariyat (Muhmmad Siddiq al Manshawi).mp3",
    downloadUrl:
      "/audio/surah-adh-dhariyat/51 Adh-Dhariyat (Muhmmad Siddiq al Manshawi).mp3",
  },
  {
    id: "at-tur-mahmood-ali-al-banna-52",
    surahName: "Surah At-Tur",
    qariName: "Mahmood Ali Al Banna",
    qariImage: "/audio/surah-at-tur/mahmood-ali-al-banna.png",
    audioSrc: "/audio/surah-at-tur/52 At-Tur (Mahmood Ali Al Banna).mp3",
    downloadUrl: "/audio/surah-at-tur/52 At-Tur (Mahmood Ali Al Banna).mp3",
  },
  {
    id: "an-najm-sharif-mustafa-53",
    surahName: "Surah An-Najm",
    qariName: "Sharif Mustafa",
    qariImage: "/audio/surah-an-najm/sharif-mustafa.jpg",
    audioSrc: "/audio/surah-an-najm/53 An-Najm (Sharif Mustafa).mp3",
    downloadUrl: "/audio/surah-an-najm/53 An-Najm (Sharif Mustafa).mp3",
  },
  {
    id: "al-qamar-muhammad-al-tablawi-54",
    surahName: "Surah Al-Qamar",
    qariName: "Muhammad Al Tablawi",
    qariImage: "/audio/surah-al-qamar/muhammad-al-tablawi.jpg",
    audioSrc: "/audio/surah-al-qamar/54 Al-Qamar (Muhammad Al Tablawi).mp3",
    downloadUrl: "/audio/surah-al-qamar/54 Al-Qamar (Muhammad Al Tablawi).mp3",
  },
  {
    id: "ar-rahman-mehmood-al-husairy-55",
    surahName: "Surah Ar-Rahman",
    qariName: "Mehmood Al Husairy",
    qariImage: "/audio/surah-ar-rahman/mehmood-al-husairy.jpg",
    audioSrc: "/audio/surah-ar-rahman/55 Ar-Rahman (Mahmood Al Husairy).mp3",
    downloadUrl: "/audio/surah-ar-rahman/55 Ar-Rahman (Mahmood Al Husairy).mp3",
  },
];

function getSurahNumberFromUrl(url?: string): number | null {
  if (!url) return null;
  const match = url.match(/\/(\d{1,3})\s/);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

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
    <article className="group relative overflow-hidden rounded-[24px] border border-tff-navy/10 bg-white p-3 shadow-tff-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-tff-elegant">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-tff-gold-gradient text-sm font-semibold text-tff-navy-deep">
          {number}
        </span>
        <h3 className="font-display text-xl leading-snug text-tff-navy md:text-2xl">
          {surahName}
        </h3>
      </div>

      <button
        type="button"
        onClick={togglePlay}
        className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-inset rounded-[18px]"
      >
        <div className="relative overflow-hidden rounded-[18px] border border-tff-navy/10 bg-gray-100">
          <div className="aspect-[4/4.8] w-full">
            {showImage ? (
              <img
                src={qariImage}
                alt={qariName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B2A4A]/10 to-[#C9A961]/10 text-3xl font-bold text-[#1B2A4A]">
                {surahName.slice(0, 1)}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/55 via-transparent to-transparent" />
        </div>

        <p className="px-2 pb-0 pt-3 text-center text-base font-semibold text-tff-navy sm:text-lg">
          {qariName}
        </p>
      </button>

      <div className="mt-3 space-y-2 px-1 pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A961]/20 text-[#1B2A4A] transition-colors hover:bg-[#C9A961]/30 ${downloading ? "cursor-wait opacity-50" : ""}`}
            title={downloading ? "Downloading..." : "Download"}
            aria-label={downloading ? "Downloading audio" : "Download audio"}
          >
            {downloading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1B2A4A] border-t-transparent" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1B2A4A] text-white transition-colors hover:bg-[#20345d]"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="ml-0.5 h-4 w-4" />
              )}
            </button>

            <div
              className="h-2.5 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-full bg-gray-200"
              onClick={handleProgressClick}
              role="progressbar"
              aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#C9A961] transition-all duration-150"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end px-1">
          <span className="whitespace-nowrap text-right text-[11px] sm:text-xs font-medium text-gray-500 tabular-nums tracking-tight">
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
    </article>
  );
}

export function PlaylistPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="min-h-[60vh] pb-40 sm:pb-48 lg:pb-56">
      <section className="relative isolate overflow-hidden bg-tff-navy-gradient pt-32 pb-24 text-white md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '480px' }}
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-tff-gold/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 right-0 -z-10 h-[340px] w-[340px] rounded-full bg-tff-gold/15 blur-3xl"
        />

        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-tff-gold/40 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-tff-gold-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tff-gold" />
              Playlist
            </div>

            <h1 className="mt-6 font-display text-4xl leading-[1.1] md:text-6xl">
              Listen to the Qur&apos;an in{' '}
              <span className="italic text-tff-gold-soft">Every Voice.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              One Surah, one recitation, and a different Qari&apos;s voice each time —
              a calm, immersive way to listen, reflect, and revisit the words of Allah.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-tff-gold-gradient px-6 py-3.5 font-semibold text-tff-navy-deep shadow-tff-gold">
                Explore Playlist
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#091a2f] shadow-tff-elegant ring-1 ring-[#c9a961]/25">
              <img
                src="/playlist.jpg"
                alt="A young boy reading the Qur'an on a wooden stand in a mosque"
                className="h-full w-full object-cover object-[70%_center]"
              />
            </div>
            <div className="glass-dark absolute -bottom-6 left-6 right-6 rounded-2xl px-6 py-4 md:left-8 md:right-8">
              <p className="text-xs uppercase tracking-widest text-tff-gold-soft">Listen With Purpose</p>
              <p className="mt-1 font-display text-xl text-white">Reflection. Recitation. Peace.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10 sm:h-14 bg-[#FAF8F4]" aria-hidden />

      <section className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-8 sm:pt-10 pb-6">
        <div className="reciter-grid">
          {RECITATIONS.map((rec, index) =>
            (() => {
              const surahNumber =
                getSurahNumberFromUrl(rec.audioSrc) ??
                getSurahNumberFromUrl(rec.downloadUrl);
              return (
                <RecitationCard
                  key={rec.id}
                  number={surahNumber ?? index + 1}
                  {...rec}
                  isPlaying={playingId === rec.id}
                  onPlayRequest={(id) => setPlayingId(id)}
                  onPauseRequest={() => setPlayingId(null)}
                />
              );
            })(),
          )}
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
