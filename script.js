var app = new Vue({
    el: '#app',
    data: {
        classNames: [],
        raceNames: [],
        classURLs: [],
        raceURLs: [],
        classSelection: "",
        raceSelection: "",
        cors: "https://cors-anywhere.herokuapp.com/"
    },
    computed: {
        fetchClasses() {
            const url = this.cors + "http://dnd5eapi.co/api/classes/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    console.log(json.results);
                    for (let i = 0; i < json.results.length; i++) {
                        console.log(json.results[i]);
                        this.classNames.push(json.results[i].name);
                        this.classURLs.push(json.results[i].url);
                    }
                });
        },
        fetchRaces() {
            const url = this.cors + "http://dnd5eapi.co/api/races/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    console.log(json.results);
                    for (let i = 0; i < json.results.length; i++) {
                        console.log(json.results[i]);
                        this.raceNames.push(json.results[i].name);
                        this.raceURLs.push(json.results[i].url);
                    }
                });
        },
    },
});
