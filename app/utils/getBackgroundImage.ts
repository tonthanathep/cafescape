export const getBackgroundImageUrl = () => {
  const hours = new Date().getHours();
  let imageUrl;

  if (hours >= 5 && hours < 12) {
    // Morning (5 AM to 11:59 AM)
    imageUrl = "/images/hero.jpg";
  } else if (hours >= 12 && hours < 18) {
    // Afternoon (12 PM to 5:59 PM)
    imageUrl = "/images/hero.jpg";
  } else if (hours >= 18 && hours < 21) {
    // Evening (6 PM to 8:59 PM)
    imageUrl = "/images/hero.jpg";
  } else {
    // Night (9 PM to 4:59 AM)
    imageUrl = "/images/hero.jpg";
  }

  return imageUrl;
};
