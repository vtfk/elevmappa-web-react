export const hasStudent = items => !Array.isArray(items) && Object.getOwnPropertyNames(items).length > 0
export const hasDocuments = items => hasStudent(items) && items.documents.length > 0

export const hasStudents = items => Array.isArray(items) && items.length > 0
