/** @jsxImportSource theme-ui */

const Landing = () => {
  return (
    <section
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: [3, 4],
        py: [4, 5],
        flexDirection: 'column',
        bg: 'background',
      }}
    >
      <div
        sx={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: ['column', 'row'],
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <div
          sx={{
            display: 'flex',
            flexDirection: ['row', 'column'],
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            flex: ['none', '0 0 25%'],
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              sx={{
                width: ['60px', '80px'],
                height: ['60px', '80px'],
                bg: 'muted',
                borderRadius: 6,
              }}
            />
          ))}
        </div>


        <div
          sx={{
            width: ['100%', '60%'],
            height: ['200px', '400px'],
            bg: 'highlight',
            borderRadius: 8,
            my: [4, 0],
          }}
        />

        <div
          sx={{
            display: ['none', 'flex'],
            flex: '0 0 25%',
          }}
        />
      </div>


      <div
        sx={{
          mt: [4, 5],
          fontSize: [4, 5, 6],
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '800px',
          color: 'text',
        }}
      >
        This is a large text placeholder
      </div>
    </section>
  );
};

export default Landing;
