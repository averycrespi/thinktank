import {
  Visibility,
  createMatch,
  getMatch,
  joinMatch,
  leaveMatch,
  listMatchIDs,
} from "./match";

import fetchMock from "jest-fetch-mock";
import { Player } from "../logic/player";

const serverURL = `http://localhost:8000`;

beforeEach(() => fetchMock.resetMocks());

test("fail to create match when response is not ok", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 404 });
  expect(createMatch(serverURL, Visibility.PRIVATE)).rejects.toThrowError();
});

test("fail to create match when response does not have valid match ID", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 200 });
  expect(createMatch(serverURL, Visibility.PRIVATE)).rejects.toThrowError();
});

test("fail to join match when response is not ok", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 404 });
  expect(joinMatch(serverURL, "foo", Player.One)).rejects.toThrowError();
});

test("fail to create match when response does not have valid player credentials", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 200 });
  expect(joinMatch(serverURL, "id", Player.One)).rejects.toThrowError();
});

test("fail to leave match when response is not ok", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 404 });
  expect(
    leaveMatch(serverURL, "id", Player.One, "creds")
  ).rejects.toThrowError();
});

test("fail to list match IDs when response is not ok", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 404 });
  expect(listMatchIDs(serverURL)).rejects.toThrowError();
});

test("fail to list match ids when response does not have valid matches", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 200 });
  expect(listMatchIDs(serverURL)).rejects.toThrowError();
});

test("fail to get match when response is not ok", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 404 });
  expect(getMatch(serverURL, "id")).rejects.toThrowError();
});

test("fail to get match when response does not have valid match data", async () => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce("{}", { status: 200 });
  expect(getMatch(serverURL, "id")).rejects.toThrowError();
});
