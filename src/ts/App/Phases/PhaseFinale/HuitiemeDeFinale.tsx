import {MatchTable} from "../../../Template/MatchTable"
import React, {useEffect, useState} from "react"
import {GroupsProps} from "../../../Types/GroupsProps"
import Teams from "../../../../Mock/Teams"
import {TeamModel} from "../../../Models/TeamModel"
import {Tools} from "../../../Utils/Tools"

export function HuitiemeDeFinale() {
	const [groups, setGroups] = useState<GroupsProps | null>(null)
	useEffect(() => {
		localStorage.groups && setGroups(JSON.parse(localStorage.groups))
	}, [setGroups])

	if (!groups) return <h2>Loading</h2>

	const setMatchs = groups && {
		A: [groups.A[0], groups.B[1]],
		B: [groups.C[0], groups.D[1]],
		C: [groups.E[0], groups.F[1]],
		D: [groups.G[0], groups.H[1]],
		E: [groups.B[0], groups.A[1]],
		F: [groups.D[0], groups.C[1]],
		G: [groups.F[0], groups.E[1]],
		H: [groups.H[0], groups.G[1]],
	}
	return (
		<>
			<MatchTable
				key={Tools.generateId("A")}
				id={"A"}
				match={setMatchs.A}
			/>
			<MatchTable
				key={Tools.generateId("B")}
				id={"B"}
				match={setMatchs.B}
			/>
			<MatchTable
				key={Tools.generateId("C")}
				id={"C"}
				match={setMatchs.C}
			/>
			<MatchTable
				key={Tools.generateId("D")}
				id={"D"}
				match={setMatchs.D}
			/>
			<MatchTable
				key={Tools.generateId("E")}
				id={"E"}
				match={setMatchs.E}
			/>
			<MatchTable
				key={Tools.generateId("F")}
				id={"F"}
				match={setMatchs.F}
			/>
			<MatchTable
				key={Tools.generateId("G")}
				id={"G"}
				match={setMatchs.G}
			/>
			<MatchTable
				key={Tools.generateId("H")}
				id={"H"}
				match={setMatchs.H}
			/>
		</>
	)
}
