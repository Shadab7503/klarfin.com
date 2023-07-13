const FormatDateFromMongo = (dateString: string): string => {
    const date: Date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Kolkata'
    };
    const formattedDate: string = date.toLocaleString('en-IN', options);
    return formattedDate;
  }

  export default FormatDateFromMongo;