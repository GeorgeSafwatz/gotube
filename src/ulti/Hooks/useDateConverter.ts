const useDateConverter = () => {
  const convertDuration = (duration: string) => {
    const matches = duration.match(/PT(\d+M)?(\d+S)?/);

    const minutes = parseInt(matches?.[1] as string) || 0;
    const seconds = parseInt(matches?.[2] as string) || 0;

    const date = new Date();
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const formatted = date.toISOString().substring(11, 11 + 5);
    return formatted;
  };

  const convertDate = (initialDate: string) => {
    const date = new Date(initialDate).getTime();
    const now = new Date().getTime();
    const diff = now - date;

    if (diff < 1000 * 60) {
      return `${Math.floor(diff / 1000)} seconds ago`;
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))} minutes ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60))} hours ago`;
    } else if (diff < 1000 * 60 * 60 * 24 * 30) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`;
    } else if (diff < 1000 * 60 * 60 * 24 * 365) {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} months ago`;
    } else {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 365))} years ago`;
    }
  };

  return {
    convertDuration,
    convertDate,
  };
};

export default useDateConverter;
