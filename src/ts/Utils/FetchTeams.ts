import Teams from "../../Mock/Teams"
import {TeamModel} from "../Models/TeamModel"

export function fetchTeams(): TeamModel[] {
	const teams = Teams.map(team => {
		return new TeamModel(team, "")
	})

	teams.map(team => {
		if (team.id === "qata" || team.id === "ecua" || team.id === "sene" || team.id === "neth") team.group = "A"
		if (team.id === "engl" || team.id === "iran" || team.id === "usa" || team.id === "wale") team.group = "B"
		if (team.id === "arge" || team.id === "saud" || team.id === "mexi" || team.id === "pola") team.group = "C"
		if (team.id === "fran" || team.id === "aust" || team.id === "denm" || team.id === "tuni") team.group = "D"
		if (team.id === "spai" || team.id === "cost" || team.id === "germ" || team.id === "japa") team.group = "E"
		if (team.id === "belg" || team.id === "cana" || team.id === "moro" || team.id === "croa") team.group = "F"
		if (team.id === "braz" || team.id === "serb" || team.id === "swit" || team.id === "came") team.group = "G"
		if (team.id === "port" || team.id === "ghan" || team.id === "urug" || team.id === "sout") team.group = "H"
	})

	return teams
}
