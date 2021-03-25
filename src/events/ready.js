module.exports = client => {
    client.on("ready", async () => {
        console.log(`Logged in as ${client.user.username}`);

        client.user.setPresence({
            status: "online",
            activity: {
                name: `To your chatter`,
                type: "LISTENING"
            }
        });
    });
}