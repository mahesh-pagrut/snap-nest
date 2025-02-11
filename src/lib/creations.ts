import { getCldImageUrl } from "next-cloudinary";

const collageTemplates: Record<number, Function> = {
    2: (publicIds: Array<string>) =>{
        return {
            overlays: [
                {
                  publicId: publicIds[0],
                  position: {
                    gravity: 'west'
                  },
                  effects: [{
                    width: 600,
                    height: 1200,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                },
                {
                  publicId: publicIds[1],
                  position: {
                    gravity: 'east'
                  },
                  effects: [{
                    width: 600,
                    height: 1200,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                }
              ],
        }
    },
    3: (publicIds: Array<string>) =>{
        return {
            overlays: [
                {
                  publicId: publicIds[0],
                  position: {
                    gravity: 'west'
                  },
                  effects: [{
                    width: 600,
                    height: 1200,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                },
                {
                  publicId: publicIds[1],
                  position: {
                    gravity: 'north_east'
                  },
                  effects: [{
                    width: 600,
                    height: 600,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                },
                {
                    publicId: publicIds[2],
                    position: {
                      gravity: 'south_east'
                    },
                    effects: [{
                      width: 600,
                      height: 600,
                      crop: 'fill',
                      gravity: 'auto'
                    }]
                  }
              ]
        }
    },
    4: (publicIds: Array<string>) =>{
        return {
            overlays: [
                {
                  publicId: publicIds[0],
                  position: {
                    gravity: 'north_west'
                  },
                  effects: [{
                    width: 600,
                    height: 600,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                },
                {
                  publicId: publicIds[1],
                  position: {
                    gravity: 'south_west'
                  },
                  effects: [{
                    width: 600,
                    height: 600,
                    crop: 'fill',
                    gravity: 'auto'
                  }]
                },
                {
                    publicId: publicIds[2],
                    position: {
                      gravity: 'north_east'
                    },
                    effects: [{
                      width: 600,
                      height: 600,
                      crop: 'fill',
                      gravity: 'auto'
                    }]
                  },
                  {
                    publicId: publicIds[3],
                    position: {
                      gravity: 'south_east'
                    },
                    effects: [{
                      width: 600,
                      height: 600,
                      crop: 'fill',
                      gravity: 'auto'
                    }]
                  }
              ]
        }
    }
}

export function getCollage(publicIds: Array<string>){
    const template = collageTemplates[publicIds.length];

    if (!template){
        throw new Error('Template not defined')
    }

    const url = getCldImageUrl({
        src: publicIds[0],
        width: 1200,
        height: 1200,
        crop: {
          type: "fill",
          source: true,
        },
        version: Date.now(),
        effects: [{
          colorize: "100,co_white",
          background: 'white'
        }],
        ...template(publicIds)
      })
      return url;
}


export function getAnimation(publicIds: Array<string>){
    const url = getCldImageUrl({
        src: publicIds[0],
        width: 1200,
        height: 1200,
        crop: {
          type: "fill",
          source: true,
          gravity: 'center'
        },
        zoompan: 'loop',
        version: Date.now(),
      
      })
      return url;
}