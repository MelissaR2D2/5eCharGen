var app = new Vue({
    el: '#app',
    data: {
        myClasses: [],
        myRaces: [],
        mySubraces: [],
        classSelection: "",
        raceSelection: "",
        subraceSelection: "",
        cors: "https://cors-anywhere.herokuapp.com/"
    },
    methods: {
        fetchClasses() {
            let url = this.cors + "http://dnd5eapi.co/api/classes/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    for (let i = 0; i < json.results.length; i++) {
                        let sURL = this.cors + json.results[i].url;
                        fetch(sURL)
                            .then((response) => {
                                return (response.json());
                            })
                            .then((json) => {
                                console.log(json);
                                this.myClasses.push({ name: json.name });
                            });

                    }
                });
        },
        fetchRaces() {
            let url = this.cors + "http://dnd5eapi.co/api/races/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    for (let i = 0; i < json.results.length; i++) {
                        let sURL = this.cors + json.results[i].url;
                        fetch(sURL)
                            .then((response) => {
                                return (response.json());
                            })
                            .then((json) => {
                                console.log(json);
                                this.myRaces.push({ name: json.name, subraces: json.subraces });
                            });

                    }
                });
        },
        fetchSubraces() {
            for (let i = 0; i < this.myRaces.length; i++) {
                if (this.myRaces[i].name == this.raceSelection) {
                    if (this.myRaces[i].subraces.length == 0) {
                        this.mymySuraces.push(this.myRaces[i].name);
                    }
                    else {
                        for (let j = 0; j < this.myRaces[i].subraces.length; j++) {
                            this.mySubraces.push(this.myRaces[i].subraces[j]);
                        }
                    }
                }
            }
            /*let url = this.cors + "http://dnd5eapi.co/api/races/";
            fetch(url)
                .then((response) => {
                    return (response.json());
                })
                .then((json) => {
                    console.log(json);
                    for (let i = 0; i < json.results.length; i++) {
                        let sURL = this.cors + json.results[i].url;
                        fetch(sURL)
                            .then((response) => {
                                return (response.json());
                            })
                            .then((json) => {
                                console.log(json);
                                this.myRaces.push({ name: json.name });
                            });

                    }
                });*/
        },
    },
    created: function() {
        this.fetchClasses();
        this.fetchRaces();
    }
});
