var app = new Vue({
    el: '#app',
    data: {
        fail: false,
        myClasses: [],
        myRaces: [],
        mySubraces: [],
        classSelection: "",
        raceSelection: "",
        subraceSelection: "",
        raceBonus: [0, 0, 0, 0, 0, 0],
        subraceBonus: [0, 0, 0, 0, 0, 0],
        cors: "https://cors-anywhere.herokuapp.com/",
        main_stats: [
            { name: 'barbarian', stats: ['STR', 'CON'] },
            { name: 'bard', stats: ['CHA', 'DEX'] },
            { name: 'cleric', stats: ['WIS', 'CON'] },
            { name: 'druid', stats: ['WIS', 'CON'] },
            { name: 'fighter', stats: ['STR', 'CON'] },
            { name: 'monk', stats: ['DEX', 'WIS'] },
            { name: 'paladin', stats: ['STR', 'CHA'] },
            { name: 'ranger', stats: ['DEX', 'WIS'] },
            { name: 'rogue', stats: ['DEX', 'INT'] },
            { name: 'sorcerer', stats: ['CHA', 'CON'] },
            { name: 'warlock', stats: ['CHA', 'CON'] },
            { name: 'wizard', stats: ['INT', 'DEX'] },
        ],
        //Yes, this is extremely arbitrary
        base_order: ['CON', 'DEX', 'WIS', 'CHA', 'INT', 'STR'],
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
                                this.myRaces.push({ name: json.name, subraces: json.subraces, ability_bonuses: json.ability_bonuses });
                            });

                    }
                });
        },
        fetchSubraces() {
            console.log("it was called");
            this.mySubraces = [];
            for (let i = 0; i < this.myRaces.length; i++) {
                if (this.myRaces[i].name == this.raceSelection) {
                    if (this.myRaces[i].subraces.length == 0) {
                        this.mySubraces.push({ name: this.myRaces[i].name, ability_bonuses: [0, 0, 0, 0, 0, 0] });
                    }
                    else {
                        for (let j = 0; j < this.myRaces[i].subraces.length; j++) {
                            if (!this.fail) {
                                let sURL = this.cors + this.myRaces[i].subraces[j].url;
                                fetch(sURL)
                                    .then((response) => {
                                        return (response.json());
                                    })
                                    .then((json) => {
                                        if (json == null) {
                                            if (!this.fail) {
                                                alert("There was an error with the " + this.myRaces[i].name + " API. Please try a different race.");
                                            }
                                            this.fail = true;
                                        }
                                        console.log(json);
                                        this.mySubraces.push({ name: json.name, ability_bonuses: json.ability_bonuses });
                                    });
                            }
                        }
                    }
                }
            }
        },
        calculateStats() {
            if (this.raceSelection == "" || this.subraceSelection == "" || this.classSelection == "") {
                alert("Please make sure you have selected a race, subrace, and class.");
            }
            //changes bonus arrays to match racial bonuses
            for (let i = 0; i < this.myRaces.length; i++) {
                if (this.myRaces[i].name == this.raceSelection) {
                    this.raceBonus = this.myRaces[i].ability_bonuses;
                    if (this.myRaces[i].subraces.length != 0) {
                        for (let j = 0; j < this.mySubraces.length; j++) {
                            if (this.mySubraces[j].name == this.subraceSelection) {
                                this.subraceBonus = this.mySubraces[j].ability_bonuses;
                            }
                        }
                    }
                }
            }
        },
    },
    created: function() {
        this.fetchClasses();
        this.fetchRaces();
    }
});
