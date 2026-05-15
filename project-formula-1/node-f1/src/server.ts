import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "Flamengo Racing", base: "Rio de Janeiro, Brazil" },
  { id: 2, name: "São Paulo Speed", base: "São Paulo, Brazil" },
  { id: 3, name: "Bahia Motors", base: "Salvador, Brazil" },
  { id: 4, name: "Amazon GP", base: "Manaus, Brazil" },
  { id: 5, name: "Pantanal Racing", base: "Cuiabá, Brazil" },
  { id: 6, name: "Nordeste Team", base: "Recife, Brazil" },
  { id: 7, name: "Cerrado F1", base: "Brasília, Brazil" },
  { id: 8, name: "Paulista Racing", base: "Campinas, Brazil" },
  { id: 9, name: "Minas Speed", base: "Belo Horizonte, Brazil" },
  { id: 10, name: "Sul Racing", base: "Curitiba, Brazil" },
  { id: 11, name: "Atlântico GP", base: "Fortaleza, Brazil" },
  { id: 12, name: "Pampa Racing", base: "Porto Alegre, Brazil" },
];

const drivers = [
  { id: 1, name: "Gabriel Silva", team: "Flamengo Racing" },
  { id: 2, name: "Lucas Oliveira", team: "São Paulo Speed" },
  { id: 3, name: "Matheus Costa", team: "Bahia Motors" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);

  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);

    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);

      return { message: "Driver Not Found" };
    }

    response.type("application/json").code(200);

    return { driver };
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});