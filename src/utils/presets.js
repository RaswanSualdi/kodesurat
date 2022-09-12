const presets = [
    { label: "Today", start: new Date(), end: new Date() },
    {
        label: "Last Week",
        start: new Date(new Date().setDate(new Date().getDate() - 7)),
        end: new Date(),
    },
];

export default presets;
