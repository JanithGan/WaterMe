export interface AppUser{
    humidity: number,
    mode: string,
    settings: {
      date: string,
      duration: number,
      repeat: string,
      repeatFreq: number,
      time: string
    }
}