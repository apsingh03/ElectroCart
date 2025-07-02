function buildTree(list, parentId = null) {
  try {
    return (
      list &&
      list
        .filter((item) => item.parentId === parentId)
        .map((parent) => {
          // console.log("parent ", parent);
          const children = buildTree(list, parent.id);
          return {
            ...parent,
            children: children?.length ? children : [],
          };
        })
    );
  } catch (error) {
    console.error("Error at building Tree", error);
  }
}

module.exports = {
  buildTree,
};
