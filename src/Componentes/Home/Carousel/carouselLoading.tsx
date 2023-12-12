import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function CarouselLoading() {
  const array = [0,1,2,3,4,5]
  return (
    <Stack spacing={1}>

      <Skeleton variant="rectangular" width={390} height={120} sx={{marginTop:"130px"}}/>
      {
        array.map((e, key)=>{
          return (
            <div>
              <div style={{display:"flex", alignItems:"", marginTop:"10px"}} key={key}>
                <Skeleton variant="circular" width={40} height={40} sx={{marginRight:"10px"}} />
                <div>
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton variant="rectangular" width={290} height={6} />
                </div>
              </div>
                  <Skeleton sx={{marginTop:"10px"}} variant="rectangular" width={350} height={2} />
            </div>
          )
        })
      }

    </Stack>
  );
}
