interface UserValues {
  id?: string,
  image?: string,
  name?: string,
}

export const DEFAULT_USER_VALUES: UserValues = {
  id: '',
  image: '',
  name: '',
};

export function generateNewUser(userValues: UserValues) {
  return {
    ...DEFAULT_USER_VALUES,
    ...userValues,
  }
}