declare type State = {
  hearts: Hearts
  magic: Magic
  rupees: Rupees
}

declare type Hearts = Array<Array<Heart>>

declare type Magic = number

declare type Rupees = {
  max: number
  current: number
}

declare type UEvent = {
  type?: string
  output?: string
  error?: Error
}

declare type Heart = 0 | 0.25 | 0.5 | 0.75 | 1
