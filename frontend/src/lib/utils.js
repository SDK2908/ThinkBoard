export const formatDate = (date)=> {
    if(!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        day:"2-digit",
        month:"short",
        year:"numeric"
    });
};