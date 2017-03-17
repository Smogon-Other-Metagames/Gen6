	{
		ruleset: ['OU'],
		onSwitchIn: function (pokemon) {
			let nature = pokemon.getNature();
			if (!nature.minus) return;
			let boosts = {};
			boosts[nature.minus] = -1;
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, "Nature's Fear", 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(boosts, foeactive[i], pokemon);
				}
			}
		},
		onAfterMega: function (pokemon) {
			let nature = pokemon.getNature();
			if (!nature.minus) return;
			let boosts = {};
			boosts[nature.minus] = -1;
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, "Nature's Fear", 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(boosts, foeactive[i], pokemon);
				}
			}
		},
	},
