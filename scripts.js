fetch('http://localhost:3000/api/records')
  .then(response => response.json())
  .then(data => {
    recordsData = data;
    const totalRecords = document.getElementById('total-records');
    const artistsBody = document.getElementById('artists-body');
    
    function generateArtistTable() {
      const artistsData = getArtistsWithMultipleRecords(data);
      artistsBody.innerHTML = '';
    
      const top10Artists = artistsData.slice(0, 10);
    
      top10Artists.forEach(artist => {
        const row = document.createElement('tr');
        const artistCell = document.createElement('td');
        const countCell = document.createElement('td');
    
        artistCell.textContent = artist.name;
        countCell.textContent = artist.count;
    
        row.appendChild(artistCell);
        row.appendChild(countCell);
    
        artistsBody.appendChild(row);
      });
    }
    
  
    function getArtistsWithMultipleRecords(records) {
      const artistCounts = {};

      records.forEach(record => {
        const artist = record.artist;

        if (artist in artistCounts) {
          artistCounts[artist]++;
        } else {
          artistCounts[artist] = 1;
        }
      });

      const artistsData = Object.keys(artistCounts)
        .filter(artist => artistCounts[artist] > 1)
        .map(artist => ({ name: artist, count: artistCounts[artist] }));

      artistsData.sort((a, b) => b.count - a.count);

      return artistsData;
    }

    totalRecords.textContent = `Total Records: ${data.length}`;
    generateArtistTable();
  });

  const linkExceptionsBandcamp = [
    'Anwar Sadat',
    'Apache Dropout',
    'Big Eyes',
    'Black Cross',
    'Coliseum',
    'Destruction Unit',
    'Elsinores',
    'Good Shade',
    'Hank Wood And The Hammerheads',
    'Milk Music',
    'Phasm',
    'Sorespot',
    'This Is My Fist',
    'Tropical Trash',
    'Tweens',
    'Mystic 100s'
  ];
  
  
fetch('http://localhost:3000/api/records')
  .then(response => response.json())
  .then(data => {
    const recordsBody = document.getElementById('records-body');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const firstBtn = document.getElementById('firstBtn'); // Add first button element
    const lastBtn = document.getElementById('lastBtn'); // Add last button element
    const titleHeader = document.getElementById('title-header');
    const artistHeader = document.getElementById('artist-header');
    const releaseYearHeader = document.getElementById('release-year-header');
    const formatHeader = document.getElementById('format-header');
    const recordsPerPage = 10;
    let currentPage = 1;
    let totalPages = Math.ceil(data.length / recordsPerPage);
    let currentColumn = 'artist';
    let currentSortOrder = 'asc';
    
    function showRecords(page) {
      recordsBody.innerHTML = '';

      const sortedData = sortRecords(data, currentColumn, currentSortOrder);
      const startIndex = (page - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      let recordsToShow = sortedData.slice(startIndex, endIndex);

      recordsToShow.forEach(record => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const artistCell = document.createElement('td');
        const yearCell = document.createElement('td');
        const formatCell = document.createElement('td');

        const titleLink = document.createElement('a');
        titleLink.textContent = record.title;
        titleLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(record.title + ' ' + record.artist)}`;
        titleLink.target = '_blank';
        titleLink.title = `Listen to the ${record.title} album on YouTube`;
        titleCell.appendChild(titleLink);

        yearCell.textContent = record.releaseYear;
        formatCell.textContent = record.format;

        const artistLink = document.createElement('a');
        const wikipediaLink = getWikipediaLink(record.artist);
        if (linkExceptionsBandcamp.includes(record.artist)) {
          artistLink.textContent = record.artist;
          artistLink.href = `https://${convertToBandcampFormat(record.artist)}.bandcamp.com`;
          artistLink.target = '_blank';
          artistLink.title = `Check out ${record.artist} on Bandcamp`;
        } else if (wikipediaLink) {
          artistLink.href = wikipediaLink;
          artistLink.textContent = record.artist;
          artistLink.target = '_blank';
          artistLink.title = `Read about ${record.artist} on Wikipedia`;
        }  else {
          artistLink.textContent = record.artist;
          artistLink.style.pointerEvents = 'none';
          artistLink.style.color = '#000000';
        }
    

        artistCell.appendChild(artistLink);

        row.appendChild(titleCell);
        row.appendChild(artistCell);
        row.appendChild(yearCell);
        row.appendChild(formatCell);

        recordsBody.appendChild(row);
      });
    
      prevBtn.disabled = page === 1;
      nextBtn.disabled = page === totalPages;
    
      if (page === 1) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'inline-block';
      }
    
      if (page === totalPages) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-block';
      }
    
      // Update chart data
      const yearsData = getRecordsByYear(data);
      updateChart(yearsData);
    }
    

    
    function getWikipediaLink(artist) {
      const linkExceptions = {
        'AFI': 'AFI_(band)',
        'Black Flag': 'Black Flag (band)',
        'Ceremony': 'Ceremony (punk band)',
        'Cream': 'Cream (band)',
        'DRI': 'D.R.I. (band)',
        'Death': 'Death (proto-punk band)',
        'Endpoint': 'Endpoint (band)',
        'Hickey': 'Hickey (band)',
        'Minutemen': 'Minutemen (band)',
        'Nirvana': 'Nirvana (band)',
        'Pavement': 'Pavement (band)',
        'Police': 'Police (band)',
        'Pixies': 'Pixies (band)',
        'Pretenders': 'Pretenders (band)',
        'Shellac': 'Shellac (band)',
        'The Men': 'The Men (punk band)',
        'Sleep': 'Sleep (band)',
        'Squeeze': 'Squeeze (band)',
        'Torche': 'Torche (band)',
        'Void': 'Void (band)',
        'Wipers': 'Wipers (band)'
      };
    
      const noLinkArtists = [
        'Blatz/Filth',
        'Bugg',
        'Milk Music/Destruction Unit/Merchandise',
        'Midnight',
        'Old Baby',
        'Pampers',
        'Sapat',
        'Reese McHenry and Spider Bags',
        'Shutaro Noguchi',
        'State Champion',
      ];

      if (noLinkArtists.includes(artist)) {
        return '';
      }
    
      if (linkExceptionsBandcamp.includes(artist)) {
        return `https://${convertToBandcampFormat(artist)}.bandcamp.com`;
      }
    
      if (linkExceptions.hasOwnProperty(artist)) {
        return `https://en.wikipedia.org/wiki/${encodeURIComponent(linkExceptions[artist])}`;
      }
    
      return `https://en.wikipedia.org/wiki/${encodeURIComponent(artist)}`;
    }
    
    
    function convertToBandcampFormat(artist) {
      return artist.replace(/ /g, '').toLowerCase();
    }
    
        
    function sortRecords(records, column, sortOrder) {
      return records.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        if (column === 'artist') {
          aValue = aValue.startsWith('The ') ? aValue.slice(4) : aValue;
          bValue = bValue.startsWith('The ') ? bValue.slice(4) : bValue;
        }

        if (column === 'releaseYear') {
          aValue = parseInt(aValue, 10);
          bValue = parseInt(bValue, 10);
        }

        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    function getRecordsByYear(records) {
      const yearsData = {};

      records.forEach(record => {
        const releaseYear = record.releaseYear;

        if (releaseYear in yearsData) {
          yearsData[releaseYear]++;
        } else {
          yearsData[releaseYear] = 1;
        }
      });

      return yearsData;
    }


    
    

    function updateSortIndicator(header, sortOrder) {
      const sortIndicator = sortOrder === 'asc' ? '▲' : '▼';
      header.textContent = `${header.textContent} ${sortIndicator}`;
    }
    
    function resetSortIndicators() {
      titleHeader.textContent = 'Title';
      artistHeader.textContent = 'Artist';
      releaseYearHeader.textContent = 'Release Year';
      formatHeader.textContent = 'Format';
    }
    
    showRecords(currentPage);
    
    updateSortIndicator(artistHeader, currentSortOrder);

    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showRecords(currentPage);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        showRecords(currentPage);
      }
    });
    
    titleHeader.addEventListener('click', () => {
      resetSortIndicators();
      if (currentColumn === 'title' && currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
        updateSortIndicator(titleHeader, currentSortOrder);
      } else {
        currentColumn = 'title';
        currentSortOrder = 'asc';
        updateSortIndicator(titleHeader, currentSortOrder);
      }
      currentPage = 1;
      showRecords(currentPage);
    });
    
    artistHeader.addEventListener('click', () => {
      resetSortIndicators();
      if (currentColumn === 'artist' && currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
        updateSortIndicator(artistHeader, currentSortOrder);
      } else {
        currentColumn = 'artist';
        currentSortOrder = 'asc';
        updateSortIndicator(artistHeader, currentSortOrder);
      }
      currentPage = 1;
      showRecords(currentPage);
    });
    
    releaseYearHeader.addEventListener('click', () => {
      resetSortIndicators();
      if (currentColumn === 'releaseYear' && currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
        updateSortIndicator(releaseYearHeader, currentSortOrder);
      } else {
        currentColumn = 'releaseYear';
        currentSortOrder = 'asc';
        updateSortIndicator(releaseYearHeader, currentSortOrder);
      }
      currentPage = 1;
      showRecords(currentPage);
    });
    
    formatHeader.addEventListener('click', () => {
      resetSortIndicators();
      if (currentColumn === 'format' && currentSortOrder === 'asc') {
        currentSortOrder = 'desc';
        updateSortIndicator(formatHeader, currentSortOrder);
      } else {
        currentColumn = 'format';
        currentSortOrder = 'asc';
        updateSortIndicator(formatHeader, currentSortOrder);
      }
      currentPage = 1;
      showRecords(currentPage);
    });
    
  });


  function updateChart(yearsData) {
    const chartCanvas = document.getElementById('myChart');
    const years = Object.keys(yearsData);
    const counts = Object.values(yearsData);
  
    const ctx = chartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Records Released per Year',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
            stepSize: 1
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const index = context.dataIndex;
                const year = context.label;
                const count = context.parsed.y;
  
                const records = recordsData.filter(record => record.releaseYear === year);
                recordDetails = records.map(record => `${record.artist} - ${record.title}`).join('\n');
              
                let label = `Records: ${count}`;
                if (recordDetails) {
                  label += `\n\n${recordDetails}`;
                }
  
                return label;
              }
            }
          }
        }
      }
    });
  }
  