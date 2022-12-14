// Initial subscription / full state
const exptectedStateScryShape = {
  version: '0',
  hosts: [],
  ships: {
    troves: {
      '~zod/test': {
        team: { moderators: ['~zod', '~wet'] }, // note, get admins and members, if you need them, using a scry
        regs: {
          '/': {
            /*<permission object> */
          },
          '/folder-one': {
            /*<permisison object> */
          },
          '/folder-one/sub-folder': {
            /*<permission object> */
          },
        },
        trove: {
          '0v12345.abcde': {
            /*<node object>*/
          },
        },
      },
    },
  },
};
