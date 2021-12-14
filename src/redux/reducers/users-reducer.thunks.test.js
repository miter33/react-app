import {followThunkCreator} from "./users-reducer";
import {usersAPI} from "../../api/api";

jest.mock('../../api/api')
const userAPIMock = usersAPI;

const result = {
  resultCode: 0,
  messages: [],
  data: {}
}

test('', async () => {
  const thunk = followThunkCreator(1);
  
  const dispatchMock = jest.fn();
  userAPIMock.follow.mockReturnValue(Promise.resolve(result));
  
  await thunk(dispatchMock);
  
  expect(dispatchMock).toBeCalledTimes(3);
})