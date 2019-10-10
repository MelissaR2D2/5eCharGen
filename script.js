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
        stats_orders: [
            { name: 'Barbarian', stats: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT'] },
            { name: 'Bard', stats: ['CHA', 'DEX', 'CON', 'WIS', 'INT', 'STR'] },
            { name: 'Cleric', stats: ['WIS', 'CON', 'DEX', 'CHA', 'INT', 'STR'] },
            { name: 'Druid', stats: ['WIS', 'CON', 'DEX', 'CHA', 'INT', 'STR'] },
            { name: 'Fighter', stats: ['STR', 'CON', 'INT', 'DEX', 'WIS', 'CHA'] },
            { name: 'Monk', stats: ['DEX', 'WIS', 'CON', 'STR', 'INT', 'CHA', ] },
            { name: 'Paladin', stats: ['STR', 'CHA', 'CON', 'WIS', 'DEX', 'INT'] },
            { name: 'Ranger', stats: ['DEX', 'WIS', 'CON', 'INT', 'STR', 'CHA'] },
            { name: 'Rogue', stats: ['DEX', 'INT', 'CON', 'WIS', 'CHA', 'STR'] },
            { name: 'Sorcerer', stats: ['CHA', 'CON', 'DEX', 'INT', 'WIS', 'STR'] },
            { name: 'Warlock', stats: ['CHA', 'CON', 'DEX', 'WIS', 'INT', 'STR'] },
            { name: 'Wizard', stats: ['INT', 'DEX', 'CON', 'WIS', 'CHA', 'STR'] },
        ],
        //Yes, this is extremely arbitrary
        base_order: ['CON', 'DEX', 'WIS', 'CHA', 'INT', 'STR'],
        std_array: [15, 14, 13, 12, 10, 8],
        charStats: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
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
            this.fail = false;
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
            var classOrder = this.stats_orders.filter((currClass) => {
                return currClass.name === this.classSelection;
            });
            classOrder = classOrder[0].stats;
            console.log(classOrder);
            for (let i = 0; i < classOrder.length; i++) {
                console.log(classOrder[i]);
                this.charStats[classOrder[i]] = this.std_array[i];
            }
            console.log(this.charStats);


        },
    },
    created: function() {
        this.fetchClasses();
        this.fetchRaces();
    }
});
