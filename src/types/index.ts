export type ClassDataMap = {
  title: string
  description: string | undefined
  constructor: {
    title: string
    description: string | undefined
  }
  properties: PropertiesMap,
  accessors: AccessorsMap,
  methods: MethodsMap
}

export type ClassesDataMap = {
  [key: string]: ClassDataMap
}

export type PropertyMap = {
  title: string
  type: string | undefined
  isStatic: boolean
  description: string | undefined
}

export type PropertiesMap = {
  [key: string]: PropertyMap
}

export type AccessorMap = {
  title: string,
  returnType: string
  isStatic: boolean
  description: string | undefined
}

export type AccessorsMap = {
  [key: string]: AccessorMap
}

export type MethodMap = {
  title: string,
  returnType: string,
  isStatic: boolean
  description: string | undefined
}

export type MethodsMap = {
  [key: string]: MethodMap
}