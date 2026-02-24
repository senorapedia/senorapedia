export const senorasData = Array.from({ length: 47 }, (_, i) => {
  const baseData = [
    {
      nickname: "Rupolla",
      realName: "RuPaul Charles",
      category: "Travesti",
      img: "images/rupaul_2.png",
    },
    {
      nickname: "Supremme La Mala",
      realName: "RuPaul Charles",
      category: "Travesti",
      img: "images/rupaul_3.png",
    },
    {
      nickname: "Tia Rupi",
      realName: "RuPaul Charles",
      category: "Travesti",
      img: "images/rupaul.png",
    },
    {
      nickname: "La Pájara Carpintera",
      realName: "Sabrina Carpenter",
      category: "Icono",
      img: "images/sabrina.png",
    },
  ];

  const base = baseData[i % baseData.length];

  return {
    id: i + 1,
    // Añadimos el índice al nombre para que veas cómo ordena alfabéticamente
    nickname: `${base.nickname} ${String.fromCharCode(65 + (i % 26))}${i}`,
    realName: base.realName,
    category: base.category,
    img: base.img,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
});
