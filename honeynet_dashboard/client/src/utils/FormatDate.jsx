const formatDate = (inDate) => {
    const date = new Date(inDate);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    return date.toLocaleString("en-US", options);
};

export default formatDate;
