var app = new Vue({
    el: '#app',
    data: {
        myClasses: [],
        myRaces: [],
        mySubraces: [],
        classSelection: "",
        raceSelection: "",
        subraceSelection: "",
        cors: "https://cors-anywhere.herokuapp.com/",
        stats_orders: [
            { name: 'barbarian', stats: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT'] },
            { name: 'bard', stats: ['CHA', 'DEX', 'CON', 'WIS', 'INT', 'STR'] },
            { name: 'cleric', stats: ['WIS', 'CON', 'DEX', 'CHA', 'INT', 'STR'] },
            { name: 'druid', stats: ['WIS', 'CON', 'DEX', 'CHA', 'INT', 'STR'] },
            { name: 'fighter', stats: ['STR', 'CON', 'INT', 'DEX', 'WIS', 'CHA'] },
            { name: 'monk', stats: ['DEX', 'WIS', 'CON', 'STR', 'INT', 'CHA', ] },
            { name: 'paladin', stats: ['STR', 'CHA', 'CON', 'WIS', 'DEX', 'INT'] },
            { name: 'ranger', stats: ['DEX', 'WIS', 'CON', 'INT', 'STR', 'CHA'] },
            { name: 'rogue', stats: ['DEX', 'INT', 'CON', 'WIS', 'CHA', 'STR'] },
            { name: 'sorcerer', stats: ['CHA', 'CON', 'DEX', 'INT', 'WIS', 'STR'] },
            { name: 'warlock', stats: ['CHA', 'CON', 'DEX', 'WIS', 'INT', 'STR'] },
            { name: 'wizard', stats: ['INT', 'DEX', 'CON', 'WIS', 'CHA', 'STR'] },
        ],
        //Yes, this is extremely arbitrary
        base_order: ['CON', 'DEX', 'WIS', 'CHA', 'INT', 'STR'],
        std_array: [15, 14, 13, 12, 10, 8],
        charStats: { "STR": 0, "DEX": 0, "CON": 0, "INT": 0, "WIS": 0, "CHA": 0 },
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
