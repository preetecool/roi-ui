export async function getComponent(name: string) {
  try {
    const component = await import(`@/registry/brook/examples/${name}`);
    return component.default || component[name] || Object.values(component)[0];
  } catch (error) {
    console.error(error, `Component ${name} not found`);
    return null;
  }
}
