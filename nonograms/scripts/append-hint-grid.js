export const appendHintGrid = function(gridWrap, topHint, gridLeftHint, leftHint, grid) {
  gridWrap.append(topHint);
  gridLeftHint.append(leftHint);
  gridLeftHint.append(grid);
  gridWrap.append(gridLeftHint);
}