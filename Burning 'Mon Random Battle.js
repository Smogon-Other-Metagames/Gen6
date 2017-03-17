	{
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			for (let i = 0; i < this.p1.pokemon.length; i++)
				if (this.p1.pokemon[i].runStatusImmunity('brn'))
					this.p1.pokemon[i].status = 'brn';
			for (let i = 0; i < this.p2.pokemon.length; i++)
				if (this.p2.pokemon[i].runStatusImmunity('brn'))
					this.p2.pokemon[i].status = 'brn';
		},
		onResidualOrder: 999,
		onResidual: function () {
			this.p1.pokemon[0].trySetStatus('brn');
			this.p2.pokemon[0].trySetStatus('brn');
		},
	},
