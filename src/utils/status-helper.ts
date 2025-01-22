export const getStatusClass = (entity, model) => {
  switch (model) {
  case 'orders':
    switch(entity.status) {
    case 'canceled': return 'danger'
    case 'pending': return 'warning'
    case 'delivered': return 'success'
    default: return 'danger'
    }
  case 'inventories':
  case 'shippings': return (entity.lockedAt) ? 'success' : 'danger'
  default: return 'danger'
  }
}
