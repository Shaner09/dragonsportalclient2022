const mockData = {
  users: [
    {
      _id: "u1",
      username: "shaner09",
      language: "en",
      nickname: "Shane",
      password:'shanep',
      groups: ["c1", "c2", "c3"],
    },
    {
      _id: "u2",
      username: "justin1",
      language: "en",
      nickname: "Justin",
      password:'justinp',
      groups: ["c1", "c2", "c4"],
    },
    {
        _id: "u3",
        username: "martin1",
        language: "es",
        nickname: "martin",
        password:'martinp',
        groups: ["c1", "c3", "c4"],
      },
  ],
  groups: [
    {
      _id:'c1',
      title:'SJM grp 1',
      inviteCode:'',
      participants:['u1','u2','u3'],
      thoughts:['p1','p8','p15','p2','p9'],
      creator:'u1',
    },
    {
        _id:'c2',
        title:'SJ grp',
        inviteCode:'',
        participants:['u1','u2'],
        thoughts:['p10','p3','p11','p4','p12'],
        creator:'u2',
      },
      {
        _id:'c3',
        title:'MS grp',
        inviteCode:'',
        participants:['u1','u3'],
        thoughts:['p5','p16','p6','p17','p7'],
        creator:'u1',
      },
      {
        _id:'c4',
        title:'JM grp',
        inviteCode:'',
        participants:['u2','u3'],
        thoughts:['p18','p13','p19','p14','p20'],
        creator:'u3',
      },
      {
        _id:'c7',
        title:'test grp',
        inviteCode:'hello',
        participants:['u3'],
        thoughts:['p20'],
        creator:'u3',
      }
  ],
  thoughts: [
    {
        _id:'p1',
        language:'en',
        message:'hello, my name is shane. 1',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:1.1
    },
    {
        _id:'p2',
        language:'en',
        message:'hello, my name is shane. 4',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:2.1
    },
    {
        _id:'p3',
        language:'en',
        message:'hello, my name is shane.',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:3.1
    },
    {
        _id:'p4',
        language:'en',
        message:'hello, my name is shane.',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:4.1
    },
    {
        _id:'p5',
        language:'en',
        message:'hello, my name is shane.',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:5.1
    },
    {
        _id:'p6',
        language:'en',
        message:'hello, my name is shane.',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:6.1
    },
    {
        _id:'p7',
        language:'en',
        message:'hello, my name is shane.',
        creator:'u1',
        creatorNickName:'shane',
        createdAt:7.1
    },
    {
        _id:'p8',
        language:'en',
        message:'hello, my name is justin. 2',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:1.2
    },
    {
        _id:'p9',
        language:'en',
        message:'hello, my name is justin. 5',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:2.2
    },
    {
        _id:'p10',
        language:'en',
        message:'hello, my name is justin.',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:3.2
    },
    {
        _id:'p11',
        language:'en',
        message:'hello, my name is justin.',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:4.2
    },
    {
        _id:'p12',
        language:'en',
        message:'hello, my name is justin.',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:5.2
    },
    {
        _id:'p13',
        language:'en',
        message:'hello, my name is justin.',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:6.2
    },
    {
        _id:'p14',
        language:'en',
        message:'hello, my name is justin.',
        creator:'u2',
        creatorNickName:'justin',
        createdAt:7.2
    },
    {
        _id:'p15',
        language:'es',
        message:'hola, me llamo martin. 3',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:1.3
    },
    {
        _id:'p16',
        language:'es',
        message:'hola, me llamo martin.',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:2.3
    },
    {
        _id:'p17',
        language:'es',
        message:'hola, me llamo martin.',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:3.3
    },
    {
        _id:'p18',
        language:'es',
        message:'hola, me llamo martin.',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:4.3
    },
    {
        _id:'p19',
        language:'es',
        message:'hola, me llamo martin.',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:5.3
    },
    {
        _id:'p20',
        language:'es',
        message:'hola, me llamo martin.',
        creator:'u3',
        creatorNickName:'martin',
        createdAt:6.3
    }
  ]
};
export default mockData;
