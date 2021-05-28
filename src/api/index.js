import instance from "./axios"

export async function getPairs(id_cable, pair_number, pair_sec) {
  let result = await instance.get(`/pairs/${id_cable}/${pair_number}/${pair_sec}`)
  return result.data
}

export async function getPorts(port_name) {
  let result = await instance.get(`/ports/${port_name}`)
  return result.data
}

export async function getWires() {
  let result = await instance.get("/cables")
  return result.data
}

export async function getEquipmentMode() {
  let result = await instance.get("/equipment/mode")
  return result.data
}

export async function getEquipmentCharacteristics() {
  let result = await instance.get("/equipment/characteristics")
  return result.data
}

export async function getOlt() {
  let result = await instance.get("/olt")
  return result.data
}

export async function getNodes() {
  let result = await instance.get("/nodes")
  return result.data
}

export async function getDslamPorts(id_dslam) {
  let result = await instance.get(`/dslam/ports/${id_dslam}`)
  return result.data
}

export async function getDslams() {
  let result = await instance.get("/dslams")
  return result.data
}

export async function getTeamMaterials(id_deposit) {
  let result = await instance.get(`/task/deposit/articles/${id_deposit}`)
  return result.data
}

export async function getTasksTeam(id_user) {
  let result = await instance.get(`/tasks/team/${id_user}`)
  return result.data
}

export async function getRegions(id_service) {
  let result = await instance.get(`/regions/${id_service}`)
  return result.data
}

export async function getServiceTypes(id_service) {
  let result = await instance.get(`/service/types/${id_service}`)
  return result.data
}

export async function getProblems(id_service, id, id_account_type_service, search) {
  let json_data = { id_service: id_service, id: id, id_account_type_service: id_account_type_service, search: search }
  let result = await instance.post("/problems", json_data)
  return result.data
}

export async function createTask(id_service, id_account, id_task_type, id_problem, description, id_user) {
  let json_data = {
    id_service,
    id_account,
    id_task_type,
    id_problem,
    description,
    id_user,
  }
  let result = await instance.post("/task", json_data)
  return result.data
}

export async function getTasksStatics() {
  let result = await instance.get("/task/amount")
  return result.data
}

export async function createIncident(id_task, description, id_user) {
  let json_data = {
    id_task: id_task,
    description: description,
    id_user: id_user,
  }
  let result = await instance.post("/task/incident", JSON.stringify(json_data))
  return result.data
}

export async function updatedUserProfile(data) {
  let res = await instance.post("/upload", data)
  const result = res.data
  return result
}

export async function getServices() {
  let result = await instance.get("/task/services")
  return result.data
}

export async function getTaskTypes() {
  const res = await instance.get("/task/type")
  const data = await res.data
  return data
}

export async function getSubAccountConnections(username, date_from, date_to) {
  const date = date_from || date_to !== "" ? `${date_from}/${date_to}` : ""
  let result = await instance.get(`/clients/sub_clients/connections/${username}/${date}`)
  return result.data
}

export async function getSubAccountData(id_service, id_sub_account) {
  let result = await instance.get(`/clients/sub_client/${id_service}/${id_sub_account}`)
  return result.data
}

export async function getClientSubAccounts(id_service, id_account) {
  let result = await instance.get(`/clients/sub_clients/${id_service}/${id_account}`)
  return result.data
}

export async function getClients(id_service, account_name, account_number, doc_number, phone_number) {
  const json_data = {
    id_service: id_service,
    account_name: account_name,
    account_number: account_number,
    doc_number: doc_number,
    phone_number: phone_number,
  }
  let result = await instance.post("/clients", JSON.stringify(json_data))
  return result.data
}

export async function getLoginUser(username, password) {
  const json_data = {
    username,
    password,
  }
  let result = await instance.post("/login", JSON.stringify(json_data))
  return result.data
}

export async function getCalendar(id_service, from_date = "") {
  let url = `/task/calendar/${id_service}`
  if (from_date.length > 0) {
    url = `/task/calendar/${id_service}/${from_date}`
  }
  const res = await instance.get(url)
  const data = res.data
  return data
}

// DEJAR UNA DE LAS DOS
export async function getStatus() {
  const res = await instance.get(`/task/status`)
  const data = await res.data
  return data
}

export async function getTasks(
  id_service,
  task_number,
  account_number,
  doc_number,
  ids_task_type,
  ids_service_type,
  ids_state,
  ids_region
) {
  const json_data = {
    id_service: id_service,
    task_number: task_number,
    account_number: account_number,
    doc_number: doc_number,
    ids_task_type: ids_task_type,
    ids_service_type: ids_service_type,
    ids_state: ids_state,
    ids_region: ids_region,
  }
  const res = await instance.post("/tasks", JSON.stringify(json_data))
  const data = res.data
  return data
}

export async function getTask(id_service, id_task) {
  const res = await instance.get(`/task/${id_service}/${id_task}`)
  const data = await res.data
  return data
}

export async function getStatusTask(id_task) {
  const res = await instance.get(`/task/status/${id_task}`)
  const data = await res.data
  return data
}

export async function createStatusTask(id_calendar, id_status) {
  const json_data = {
    id_calendar,
    id_status,
  }
  const res = await instance.post(`/task/status`, JSON.stringify(json_data))
  const data = res.data
  return data
}

export async function closeTask(
  id_service,
  id_task,
  id_account,
  id_task_type,
  id_calendar,
  description,
  id_node,
  fo,
  dslam,
  equipment_updated,
  equipment_recovered,
  materials,
  technical_data
) {
  const json_data = {
    id_service,
    id_task,
    id_account,
    id_task_type,
    id_calendar,
    description,
    id_node,
    fo,
    dslam,
    equipment_updated,
    equipment_recovered,
    materials,
    technical_data,
  }
  let result = await instance.post(`/task/close`, JSON.stringify(json_data))
  return result.data
}

export async function getFilters(id_service) {
  let result = await instance.get(`/tasks/filters/${id_service}`)
  return result.data
}

export async function getTeams(id_service) {
  const res = await instance.get(`/task/teams/${id_service}/false`)
  const data = await res.data
  return data
}

export async function createCalendar(id_task, date, id_team, priority, id_user) {
  const json_data = {
    id_task,
    date,
    id_team,
    priority,
    id_user,
  }
  const res = await instance.post("/task/calendar", JSON.stringify(json_data))
  const data = res.data
  return data
}

export async function getOperators(id_service, id_team) {
  const res = await instance.get(`/task/operators/availables/${id_service}/${id_team}`)
  const data = await res.data
  return data
}

export async function getVehicles(id_service, id_team) {
  const res = await instance.get(`/task/vehicles/availables/${id_service}/${id_team}`)
  const data = await res.data
  return data
}

export async function createTeam(id_service, vehicle, operators) {
  const json_data = {
    id_service: id_service,
    vehicle: vehicle,
    operators: operators,
  }
  const res = await instance.post("/task/team", JSON.stringify(json_data))
  const data = res.data
  return data
}

export async function updateTeam(id_service, id_team, vehicle, operators) {
  const json_data = {
    id_service: id_service,
    id_team: id_team,
    vehicle: vehicle,
    operators: operators,
  }
  const res = await instance.put("/task/team", JSON.stringify(json_data))
  const data = res.data
  return data
}

export async function closeTeam(id_service, id_team) {
  const res = await instance.delete(`/task/team/${id_service}/${id_team}`)
  const data = res.data
  return data
}

export async function updateCalendarTask(id_calendar, id_task, date, id_team, priority, id_user) {
  const json_data = {
    id_calendar: id_calendar,
    id_task: id_task,
    date: date,
    id_team: id_team,
    priority: priority,
    id_user,
  }
  let res = await instance.put("/task/calendar", JSON.stringify(json_data))
  const data = await res.data
  return data
}

export async function createObservation(id_service, id_account, description, is_important) {
  let json_data = { id_service, id_account, description, is_important }
  let result = await instance.post("/observations", json_data)
  return result.data
}

export async function getObservations(id_service, id_account) {
  let result = await instance.get(`/observations/${id_service}/${id_account}`)
  return result.data
}
