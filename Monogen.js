	{
		ruleset: ['OU'],
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let gen = this.getTemplate(team[0].species).gen;
			if (!gen) return ["Your team must be from the same generation."];
			for (let i = 1; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				if (template.gen !== gen) return ["Your team must be from the same generation."];
			}
		},
	},
