	{
		ruleset: ['OU'],
		onSwitchIn: function (pokemon) {
			let type = pokemon.types.find(type => ['Fire', 'Grass', 'Water'].includes(type));
			if (!type) return;
			let pledge = [type, pokemon.hpType].sort().join();
			switch (pledge) {
			case 'Fire,Grass':
				pokemon.side.foe.removeSideCondition('grasspledge');
				pokemon.side.foe.removeSideCondition('waterpledge');
				pokemon.side.foe.addSideCondition('firepledge');
				break;
			case 'Fire,Water':
				pokemon.side.foe.removeSideCondition('firepledge');
				pokemon.side.foe.removeSideCondition('grasspledge');
				pokemon.side.foe.addSideCondition('waterpledge');
				break;
			case 'Grass,Water':
				pokemon.side.foe.removeSideCondition('firepledge');
				pokemon.side.foe.removeSideCondition('waterpledge');
				pokemon.side.foe.addSideCondition('grasspledge');
				break;
			}
		},
	},
