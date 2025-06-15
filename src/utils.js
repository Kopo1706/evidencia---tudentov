export function vypocitajZnamku(body) {
    if (body >= 90) return 1
    if (body >= 81) return 2 
    if (body >= 71) return 3
    if (body >= 61) return 4
    return 5
  }